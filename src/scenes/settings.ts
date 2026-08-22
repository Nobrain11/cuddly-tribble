import type { BotContext, RiskMode } from '../context/bot-context.js';
import { keyboards } from '../ui/keyboards.js';
import { settingsScreen } from '../ui/screens.js';
import { infoTemplate } from '../ui/templates.js';
import { render } from '../handlers/nav.js';

export async function showSettings(ctx: BotContext): Promise<void> {
  await render(
    ctx,
    settingsScreen(ctx.session),
    keyboards.settings(),
  );
}

export async function handleSettings(
  ctx: BotContext,
  data: string,
): Promise<void> {
  if (data === 'settings:size') {
    ctx.session.flow = 'settings_trade_size';

    await render(
      ctx,
      '💰 Trade Size\n\nSend your default trade size in SOL.',
    );

    return;
  }

  if (data === 'settings:slippage') {
    ctx.session.flow = 'settings_slippage';

    await render(
      ctx,
      '📉 Slippage\n\nSend your default slippage percentage.',
    );

    return;
  }

  if (data === 'settings:risk') {
    await render(
      ctx,
      '🛡 Risk Mode\n\nChoose your default risk mode:',
      keyboards.risk(),
    );

    return;
  }

  if (data.startsWith('settings:risk:')) {
    const risk = data.replace('settings:risk:', '') as RiskMode;
    ctx.session.riskMode = risk;
    await showSettings(ctx);
    return;
  }

  if (data === 'settings:alerts') {
    ctx.session.alertsEnabled = !ctx.session.alertsEnabled;
    await showSettings(ctx);
    return;
  }

  if (data === 'settings:emergency') {
    ctx.session.sniperEnabled = false;
    ctx.session.copyEnabled = false;

    await render(
      ctx,
      infoTemplate(
        'Emergency Stop',
        'Sniper and copy trading have been paused.',
      ),
      keyboards.backHome(),
    );
  }

  if (data === 'settings:back') {
    await showSettings(ctx);
  }
}
