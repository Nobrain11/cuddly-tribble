import type { BotContext } from '../context/bot-context.js';
import { keyboards } from '../ui/keyboards.js';
import { sniperScreen } from '../ui/screens.js';
import { infoTemplate } from '../ui/templates.js';
import { render } from '../handlers/nav.js';

export async function showSniper(ctx: BotContext): Promise<void> {
  await render(
    ctx,
    sniperScreen(ctx.session),
    keyboards.sniper(),
  );
}

export async function handleSniper(
  ctx: BotContext,
  data: string,
): Promise<void> {
  if (data === 'sniper:enable') {
    ctx.session.sniperEnabled = true;
    await showSniper(ctx);
    return;
  }

  if (data === 'sniper:pause') {
    ctx.session.sniperEnabled = false;
    await showSniper(ctx);
    return;
  }

  if (data === 'sniper:new_pair') {
    await render(
      ctx,
      infoTemplate(
        'New Pair Mode',
        'New pair detection is configured for Solana launches.',
      ),
      keyboards.backHome(),
    );
    return;
  }

  if (data === 'sniper:liquidity') {
    await render(
      ctx,
      infoTemplate(
        'Liquidity Add Mode',
        'The bot will monitor new liquidity events.',
      ),
      keyboards.backHome(),
    );
    return;
  }

  if (data === 'sniper:trending') {
    await render(
      ctx,
      infoTemplate(
        'Trending Mode',
        'Trending token detection is currently enabled.',
      ),
      keyboards.backHome(),
    );
    return;
  }

  if (data === 'sniper:filters') {
    await render(
      ctx,
      infoTemplate(
        'Sniper Filters',
        'Minimum liquidity: 20 SOL\nMaximum slippage: 5%\nMaximum position: 0.5 SOL',
      ),
      keyboards.backHome(),
    );
  }
}
