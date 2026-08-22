import type { SessionData } from '../context/bot-context.js';

export function defaultSession(): SessionData {
  return {
    flow: 'idle',
    tradeSize: 1,
    riskMode: 'Normal',
    sniperEnabled: false,
    copyEnabled: false,
    alertsEnabled: true,
    trackedWallets: [],
    watchlist: ['BONK', 'WIF', 'POPCAT'],
  };
}

export function resetFlow(session: SessionData): void {
  session.flow = 'idle';
  session.selectedToken = undefined;
  session.selectedAmount = undefined;
  session.selectedSlippage = undefined;
  session.selectedPosition = undefined;
  session.selectedSellPercent = undefined;
}
