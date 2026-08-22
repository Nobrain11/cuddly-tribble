import type { BotContext } from '../context/bot-context.js';
import { keyboards } from '../ui/keyboards.js';
import { alertsScreen } from '../ui/screens.js';
import { infoTemplate } from '../ui/templates.js';
import { render } from '../handlers/nav.js';

export async function showAlerts(ctx: BotContext): Promise<void> {
  await render(
    ctx,
    alertsScreen(ctx.session),
    keyboards.alerts(),
  );
}

export async function handleAlerts(
  ctx: BotContext,
  data: string,
): Promise<void> {
  if (data === 'alert:toggle') {
    ctx.session.alertsEnabled = !ctx.session.alertsEnabled;
    await showAlerts(ctx);
    return;
  }

  const labels: Record<string, string> = {
    'alert:price': 'Price alerts can be configured after selecting a token.',
    'alert:wallet': 'Wallet alerts monitor tracked wallets.',
    'alert:entry': 'Entry alerts are enabled.',
    'alert:exit': 'Exit alerts are enabled.',
    'alert:rug': 'Rug warnings are enabled.',
    'alert:pnl': 'PnL alerts are enabled.',
  };

  if (labels[data]) {
    await render(
      ctx,
      infoTemplate('Alert Settings', labels[data]),
      keyboards.backHome(),
    );
  }
}
