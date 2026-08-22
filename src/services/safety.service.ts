export interface SafetyResult {
  score: number;
  label: 'Low Risk' | 'Medium Risk' | 'High Risk';
  warnings: string[];
}

export function scanToken(symbol: string): SafetyResult {
  return {
    score: 62,
    label: 'Medium Risk',
    warnings: [
      'Liquidity should be monitored.',
      'Token is highly volatile.',
      'Only use funds you can afford to lose.',
    ],
  };
}
