export interface Position {
  symbol: string;
  amount: number;
  pnl: number;
  value: number;
}

export interface TokenData {
  symbol: string;
  price: number;
  liquidity: number;
  marketCap: number;
  change24h: number;
  safety: 'Low Risk' | 'Medium Risk' | 'High Risk';
}

const positions: Position[] = [
  {
    symbol: 'SOLX',
    amount: 120000,
    pnl: 32.4,
    value: 0.85,
  },
  {
    symbol: 'PEPE',
    amount: 500000,
    pnl: 7.1,
    value: 0.42,
  },
  {
    symbol: 'WIF',
    amount: 90,
    pnl: -4.8,
    value: 0.23,
  },
];

export function getPositions(): Position[] {
  return positions;
}

export function getToken(symbol: string): TokenData {
  return {
    symbol: symbol.toUpperCase(),
    price: 0.00001234,
    liquidity: 82000,
    marketCap: 1400000,
    change24h: 41.2,
    safety: 'Medium Risk',
  };
}

export function searchToken(input: string): TokenData {
  return getToken(input.trim().replace('$', ''));
}
