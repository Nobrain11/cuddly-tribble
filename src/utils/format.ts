export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatSol(value: number): string {
  return `${value.toFixed(4)} SOL`;
}

export function shortenAddress(address: string): string {
  if (address.length < 12) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}
