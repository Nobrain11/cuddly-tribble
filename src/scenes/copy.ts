import type { BotContext } from '../context/bot-context.js';
import { keyboards } from '../ui/keyboards.js';
import { copyScreen } from '../ui/screens.js';
import { infoTemplate } from '../ui/templates.js';
import { render } from '../handlers/nav.js';

export async function showCopy(ctx: BotContext): Promise<void> {
  await render(
    ctx,
    copyScreen(ctx.session),
    keyboards.copy(),
  );
}

export async function handleCopy(
  ctx: BotContext,
  data: string,
): Promise<void> {
  if (data === 'copy:add') {
    ctx.session.flow = 'copy_add_wallet';

    await render(
      ctx,
      '➕ Add Copy Wallet\n\nSend the wallet address to track.',
    );

    return;
  }

  if (data === 'copy:list') {
    const wallets = ctx.session.trackedWallets;

    await render(
      ctx,
      [
        '📋 Tracked Wallets',
        '',
        ...(wallets.length ? wallets : ['No wallets added yet.']),
      ].join('\n'),
      keyboards.backHome(),
    );

    return;
  }

  if (data === 'copy:allocation') {
    ctx.session.flow = 'copy_allocation';

    await render(
      ctx,
      '💰 Copy Allocation\n\nSend the allocation percentage, for example: 20',
    );

    return;
  }

  if (data === 'copy:pause') {
    ctx.session.copyEnabled = false;
    await showCopy(ctx);
    return;
  }

  if (data === 'copy:resume') {
    ctx.session.copyEnabled = true;
    await showCopy(ctx);
    return;
  }

  if (data === 'copy:autosell') {
    await render(
      ctx,
      infoTemplate(
        'Auto-Sell',
        'Auto-sell is enabled at 25%, 50%, and 100% profit targets.',
      ),
      keyboards.backHome(),
    );
  }
}
