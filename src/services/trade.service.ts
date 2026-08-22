export interface MockTradeResult {
  success: boolean;
  signature: string;
  message: string;
}

export function executeMockBuy(
  token: string,
  amount: number,
  slippage: number,
): MockTradeResult {
  return {
    success: true,
    signature: `MOCK_BUY_${Date.now()}`,
    message: `Bought ${token} with ${amount} SOL using ${slippage}% slippage.`,
  };
}

export function executeMockSell(
  token: string,
  percent: number,
): MockTradeResult {
  return {
    success: true,
    signature: `MOCK_SELL_${Date.now()}`,
    message: `Sold ${percent}% of your ${token} position.`,
  };
}

export function executeMockPanicSell(): MockTradeResult {
  return {
    success: true,
    signature: `MOCK_PANIC_${Date.now()}`,
    message: 'Emergency sell request completed in mock mode.',
  };
}
