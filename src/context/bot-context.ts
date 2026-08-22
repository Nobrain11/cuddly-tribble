import type { Context } from 'telegraf';

export type Flow =
  | 'idle'
  | 'buy_amount'
  | 'buy_custom_amount'
  | 'buy_slippage'
  | 'buy_custom_slippage'
  | 'buy_confirm'
  | 'sell_position'
  | 'sell_percent'
  | 'sell_confirm'
  | 'copy_add_wallet'
  | 'copy_allocation'
  | 'wallet_deposit'
  | 'wallet_withdraw'
  | 'alert_token'
  | 'settings_trade_size'
  | 'settings_custom_trade_size'
  | 'settings_slippage'
  | 'settings_risk';

export type RiskMode = 'Safe' | 'Normal' | 'Aggressive';

export interface SessionData {
  flow: Flow;
  selectedToken?: string;
  selectedAmount?: number;
  selectedSlippage?: number;
  selectedPosition?: string;
  selectedSellPercent?: number;
  tradeSize?: number;
  riskMode?: RiskMode;
  sniperEnabled: boolean;
  copyEnabled: boolean;
  alertsEnabled: boolean;
  trackedWallets: string[];
  watchlist: string[];
}

export interface BotContext extends Context {
  session: SessionData;
}
