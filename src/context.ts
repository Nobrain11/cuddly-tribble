import type { Context } from 'telegraf';

export interface AppSession {
  flow:
    | 'idle'
    | 'buy_coin'
    | 'buy_amount'
    | 'buy_order_type'
    | 'buy_limit_price'
    | 'buy_confirm'
    | 'sell_coin'
    | 'sell_percent'
    | 'sell_order_type'
    | 'sell_limit_price'
    | 'sell_confirm';

  selectedSymbol?: string;
  selectedAmount?: number;
  selectedPercent?: number;
  selectedOrderType?:
    | 'market'
    | 'limit'
    | 'stop_loss'
    | 'stop_limit';
  selectedLimitPrice?: number;
  paperMode: boolean;
}

export interface BotContext extends Context {
  session: AppSession;
}
