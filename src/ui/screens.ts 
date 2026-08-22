import type { SessionData } from '../context/bot-context.js';
import type { Position } from '../services/market.service.js';

export function homeScreen(
  session: SessionData,
  balance: number,
  positions: Position[],
): string {
  const pnl = '+18.4%';

  return [
    '🚀 MemeBot',
    '',
    'Fast meme trades with simple controls.',
    '',
    `💰 Balance: ${balance.toFixed(2)} SOL`,
    `📊 PnL Today: ${pnl}`,
    `📦 Positions: ${positions.length}`,
    `👀 Watchlist: ${session.watchlist.length}`,
    `🎯 Sniper: ${session.sniperEnabled ? 'ON' : 'OFF'}`,
    `🧠 Copy Trade: ${session.copyEnabled ? 'ON' : 'OFF'}`,
    `🛡 Risk: ${session.riskMode ?? 'Normal'}`,
    '',
    'Choose an action:',
  ].join('\n');
}

export function buyAmountScreen(token: string): string {
  return [
    '🟢 Buy Token',
    '',
    `Token: ${token}`,
    '',
    'Select the amount of SOL to spend:',
  ].join('\n');
}

export function buySlippageScreen(
  token: string,
  amount: number,
  slippage?: number,
): string {
  return [
    '🟢 Buy Settings',
    '',
    `Token: ${token}`,
    `Amount: ${amount} SOL`,
    `Slippage: ${slippage ? `${slippage}%` : 'Not selected'}`,
    '',
    'Select slippage, then continue:',
  ].join('\n');
}

export function buyConfirmScreen(
  token: string,
  amount: number,
  slippage: number,
  risk: string,
): string {
  return [
    '✅ Confirm Buy',
    '',
    `Token: ${token}`,
    `Amount: ${amount} SOL`,
    `Slippage: ${slippage}%`,
    `Risk Mode: ${risk}`,
    '',
    'This is the final confirmation.',
  ].join('\n');
}

export function sellPositionsScreen(positions: Position[]): string {
  const lines = positions.map(
    (position) =>
      `${position.symbol} ${position.pnl >= 0 ? '+' : ''}${position.pnl}%`,
  );

  return [
    '🔴 Sell Position',
    '',
    ...(lines.length ? lines : ['No open positions']),
    '',
    'Select a position:',
  ].join('\n');
}

export function sellPercentScreen(symbol: string): string {
  return [
    '🔴 Sell Position',
    '',
    `Token: ${symbol}`,
    '',
    'How much do you want to sell?',
  ].join('\n');
}

export function sellConfirmScreen(
  symbol: string,
  percent: number,
): string {
  return [
    '✅ Confirm Sell',
    '',
    `Token: ${symbol}`,
    `Amount: ${percent}% of position`,
    'Execution: Market',
    '',
    'This is the final confirmation.',
  ].join('\n');
}

export function positionsScreen(positions: Position[]): string {
  const rows = positions.map(
    (position) =>
      `${position.symbol}: ${position.amount} tokens | ${position.pnl >= 0 ? '+' : ''}${position.pnl}%`,
  );

  return [
    '📊 Your Positions',
    '',
    ...(rows.length ? rows : ['No open positions']),
  ].join('\n');
}

export function watchlistScreen(watchlist: string[]): string {
  return [
    '👀 Watchlist',
    '',
    ...(watchlist.length ? watchlist.map((token) => `• ${token}`) : ['Empty']),
  ].join('\n');
}

export function sniperScreen(session: SessionData): string {
  return [
    '🎯 Sniper Mode',
    '',
    `Status: ${session.sniperEnabled ? '🟢 ACTIVE' : '⚪ PAUSED'}`,
    'Chain: Solana',
    'Filters: 4 active',
    'Max position: 0.5 SOL',
    'Max slippage: 5%',
    '',
    'Choose an action:',
  ].join('\n');
}

export function copyScreen(session: SessionData): string {
  return [
    '🧠 Copy Trading',
    '',
    `Status: ${session.copyEnabled ? '🟢 ACTIVE' : '⚪ PAUSED'}`,
    `Wallets tracked: ${session.trackedWallets.length}`,
    'Allocation: 20% per wallet',
    'Auto-sell: Enabled',
    '',
    'Choose an action:',
  ].join('\n');
}

export function walletScreen(balance: number): string {
  return [
    '💼 Wallet',
    '',
    'Wallet type: Trading session wallet',
    `Balance: ${balance.toFixed(4)} SOL`,
    'Private key: Protected',
    'Withdrawals: Disabled by default',
    '',
    'Choose an action:',
  ].join('\n');
}

export function alertsScreen(session: SessionData): string {
  return [
    '🔔 Alerts',
    '',
    `Global alerts: ${session.alertsEnabled ? 'ON' : 'OFF'}`,
    'Entry alerts: ON',
    'Exit alerts: ON',
    'Rug warnings: ON',
    'PnL alerts: ON',
    '',
    'Choose an alert type:',
  ].join('\n');
}

export function settingsScreen(session: SessionData): string {
  return [
    '⚙️ Settings',
    '',
    `Default trade size: ${session.tradeSize ?? 1} SOL`,
    'Default slippage: 1%',
    `Risk mode: ${session.riskMode ?? 'Normal'}`,
    `Alerts: ${session.alertsEnabled ? 'ON' : 'OFF'}`,
    '',
    'Choose a setting:',
  ].join('\n');
}
