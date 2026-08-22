import 'dotenv/config';
import nacl from 'tweetnacl';

const BASE_URL = 'https://trading.robinhood.com';

type ApiVersion = 'v1' | 'v2';

export interface RobinhoodConfig {
  apiKey: string;
  privateKeyBase64: string;
  version: ApiVersion;
}

export interface TradingPair {
  symbol: string;
  asset_code: string;
  quote_code: string;
  asset_increment: string;
  quote_increment: string;
  max_order_size: string;
  min_order_amount: string;
  status: string;
  is_api_tradable: boolean;
}

export interface Account {
  account_number: string;
  status: string;
  buying_power: string;
  buying_power_currency: string;
  account_type?: string;
  is_api_tradable?: boolean;
}

export interface Quote {
  symbol: string;
  price?: number;
  bid?: number;
  ask?: number;
  bid_inclusive_of_sell_spread?: number;
  ask_inclusive_of_buy_spread?: number;
  buy_spread?: number;
  sell_spread?: number;
  timestamp?: string;
}

export interface Holding {
  account_number?: string;
  asset_code: string;
  total_quantity: string;
  quantity_available_for_trading: string;
}

export interface CryptoOrder {
  id: string;
  account_number?: string;
  symbol: string;
  client_order_id: string;
  side: 'buy' | 'sell';
  type: string;
  state: string;
  average_price?: number;
  filled_asset_quantity?: number;
  created_at?: string;
  updated_at?: string;
  fee_charged?: number;
  executions?: Array<{
    effective_price: string;
    quantity: string;
    timestamp: string;
  }>;
}

export interface OrderInput {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop_loss' | 'stop_limit';
  assetQuantity?: string;
  quoteAmount?: string;
  limitPrice?: string;
  stopPrice?: string;
  timeInForce?: 'gtc' | 'ioc';
}

function getConfig(): RobinhoodConfig {
  const apiKey = process.env.ROBINHOOD_API_KEY;
  const privateKeyBase64 = process.env.ROBINHOOD_PRIVATE_KEY_BASE64;

  if (!apiKey) {
    throw new Error('Missing ROBINHOOD_API_KEY');
  }

  if (!privateKeyBase64) {
    throw new Error('Missing ROBINHOOD_PRIVATE_KEY_BASE64');
  }

  return {
    apiKey,
    privateKeyBase64,
    version: process.env.ROBINHOOD_API_VERSION === 'v2'
      ? 'v2'
      : 'v1',
  };
}

function privateKeyFromBase64(base64Key: string): nacl.SignKeyPair {
  const decoded = Buffer.from(base64Key, 'base64');

  if (decoded.length === 32) {
    return nacl.sign.keyPair.fromSeed(decoded);
  }

  if (decoded.length === 64) {
    return nacl.sign.keyPair.fromSecretKey(decoded);
  }

  throw new Error(
    `Invalid Robinhood private key length: ${decoded.length} bytes`,
  );
}

function signRequest(
  config: RobinhoodConfig,
  method: string,
  path: string,
  body: string,
  timestamp: number,
): string {
  const keyPair = privateKeyFromBase64(config.privateKeyBase64);

  const message = `${config.apiKey}${timestamp}${path}${method}${body}`;

  const signature = nacl.sign.detached(
    Buffer.from(message, 'utf8'),
    keyPair.secretKey,
  );

  return Buffer.from(signature).toString('base64');
}

function apiPath(
  version: ApiVersion,
  category: string,
  resource: string,
): string {
  return `/api/${version}/crypto/${category}/${resource}`;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const config = getConfig();
  const timestamp = Math.floor(Date.now() / 1000);

  const bodyText = body === undefined
    ? ''
    : JSON.stringify(body);

  const signature = signRequest(
    config,
    method,
    path,
    bodyText,
    timestamp,
  );

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'x-signature': signature,
      'x-timestamp': String(timestamp),
    },
    body: body === undefined ? undefined : bodyText,
  });

  const raw = await response.text();

  let parsed: unknown;

  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    parsed = { raw };
  }

  if (!response.ok) {
    throw new Error(
      `Robinhood API ${response.status}: ${JSON.stringify(parsed)}`,
    );
  }

  return parsed as T;
}

function results<T>(value: unknown): T[] {
  if (
    typeof value === 'object' &&
    value !== null &&
    'results' in value &&
    Array.isArray((value as { results: unknown }).results)
  ) {
    return (value as { results: T[] }).results;
  }

  if (Array.isArray(value)) {
    return value as T[];
  }

  return [];
}

function query(values: Record<string, string | undefined>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) {
      params.set(key, value);
    }
  }

  const output = params.toString();
  return output ? `?${output}` : '';
}

export class RobinhoodCryptoClient {
  private readonly config: RobinhoodConfig;

  constructor() {
    this.config = getConfig();
  }

  async getAccount(): Promise<Account> {
    const path = apiPath(
      this.config.version,
      'trading',
      'accounts/',
    );

    const data = await request<unknown>('GET', path);

    if (
      typeof data === 'object' &&
      data !== null &&
      'results' in data
    ) {
      const list = results<Account>(data);

      if (!list[0]) {
        throw new Error('No Robinhood crypto account found');
      }

      return list[0];
    }

    return data as Account;
  }

  async getTradingPairs(
    symbol?: string,
  ): Promise<TradingPair[]> {
    const path = `${apiPath(
      this.config.version,
      'trading',
      'trading_pairs/',
    )}${query({ symbol })}`;

    const data = await request<unknown>('GET', path);
    return results<TradingPair>(data);
  }

  async getTradingPair(
    symbol: string,
  ): Promise<TradingPair | undefined> {
    const pairs = await this.getTradingPairs(symbol);
    return pairs.find(
      (pair) => pair.symbol.toUpperCase() === symbol.toUpperCase(),
    );
  }

  async getBestBidAsk(
    symbol: string,
  ): Promise<Quote> {
    const path = `${apiPath(
      this.config.version,
      'marketdata',
      'best_bid_ask/',
    )}${query({ symbol })}`;

    const data = await request<unknown>('GET', path);
    const quote = results<Quote>(data)[0];

    if (!quote) {
      throw new Error(`No quote found for ${symbol}`);
    }

    return quote;
  }

  async getEstimatedPrice(
    symbol: string,
    side: 'bid' | 'ask' | 'both',
    quantity: string,
  ): Promise<Quote[]> {
    const path = `${apiPath(
      this.config.version,
      'marketdata',
      'estimated_price/',
    )}${query({
      symbol,
      side,
      quantity,
    })}`;

    const data = await request<unknown>('GET', path);
    return results<Quote>(data);
  }

  async getHoldings(): Promise<Holding[]> {
    const path = `${apiPath(
      this.config.version,
      'trading',
      'holdings/',
    )}`;

    const data = await request<unknown>('GET', path);
    return results<Holding>(data);
  }

  async getOrders(): Promise<CryptoOrder[]> {
    const account = await this.getAccount();

    const path = `${apiPath(
      this.config.version,
      'trading',
      'orders/',
    )}${query({
      account_number: account.account_number,
    })}`;

    const data = await request<unknown>('GET', path);
    return results<CryptoOrder>(data);
  }

  async placeOrder(input: OrderInput): Promise<CryptoOrder> {
    const clientOrderId = crypto.randomUUID();

    const config: Record<string, string> = {};

    if (input.assetQuantity) {
      config.asset_quantity = input.assetQuantity;
    }

    if (input.quoteAmount) {
      config.quote_amount = input.quoteAmount;
    }

    if (input.limitPrice) {
      config.limit_price = input.limitPrice;
    }

    if (input.stopPrice) {
      config.stop_price = input.stopPrice;
    }

    if (input.timeInForce) {
      config.time_in_force = input.timeInForce;
    }

    const configName = {
      market: 'market_order_config',
      limit: 'limit_order_config',
      stop_loss: 'stop_loss_order_config',
      stop_limit: 'stop_limit_order_config',
    }[input.type];

    const body = {
      client_order_id: clientOrderId,
      side: input.side,
      type: input.type,
      symbol: input.symbol,
      [configName]: config,
    };

    const path = apiPath(
      this.config.version,
      'trading',
      'orders/',
    );

    return request<CryptoOrder>('POST', path, body);
  }

  async cancelOrder(orderId: string): Promise<CryptoOrder> {
    const path = apiPath(
      this.config.version,
      'trading',
      `orders/${orderId}/cancel/`,
    );

    return request<CryptoOrder>('POST', path);
  }
}
