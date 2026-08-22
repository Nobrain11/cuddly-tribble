export interface AlertConfig {
  enabled: boolean;
  entryAlerts: boolean;
  exitAlerts: boolean;
  rugWarnings: boolean;
  pnlAlerts: boolean;
}

export function defaultAlertConfig(): AlertConfig {
  return {
    enabled: true,
    entryAlerts: true,
    exitAlerts: true,
    rugWarnings: true,
    pnlAlerts: true,
  };
}
