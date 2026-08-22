import type { BotContext } from '../context/bot-context.js';
import { getPositions } from '../services/market.service.js';
import {
  executeMockPanicSell,
  executeMockSell,
} from '../services/trade.service.js';
import { resetFlow } from '../state/session.js';
import { keyboards } from '../ui/keyboards.js';
import {
  sellConfirmScreen,
  sellPercentScreen,
  sellPositionsScreen,
} from '../ui/screens.js';
import { successTemplate } from '../ui/templates.js';
import { render } from '../handlers/nav.js';

export async function startSell(ctx: BotContext): Promise<void> {
  ctx.session.flow = 'sell_position';

  await render(
    ctx,
    sellPositionsScreen(getPositions()),
    keyboards.sellPositions(),
  );
}

export async function handleSell(
  ctx: BotContext,
  data: string,
): Promise<void> {
  if (data === 'sell:cancel') {
    resetFlow(ctx.session);
    await render(ctx, 'Sell cancelled.', keyboards.homeOnly());
    return;
  }

  if (
    ctx.session.flow === 'sell_position' &&
    data.startsWith('sell:position:')
  ) {
    const symbol = data.replace('sell:position:', '');

    ctx.session.selectedPosition = symbol;
    ctx.session.flow = 'sell_percent';

    await render(
      ctx,
      sellPercentScreen(symbol),
      keyboards.sellPercent(),
    );

    return;
  }

  if (
    ctx.session.flow === 'sell_percent' &&
    data.startsWith('sell:percent:')
  ) {
    const percent = Number(data.replace('sell:percent:', ''));

    ctx.session.selectedSellPercent = percent;
    ctx.session.flow = 'sell_confirm';

    await render(
      ctx,
      sellConfirmScreen(
        ctx.session.selectedPosition ?? 'SOLX',
        percent,
      ),
      keyboards.sellConfirm(),
    );

    return;
  }

  if (data === 'sell:panic') {
    const result = executeMockPanicSell();

    resetFlow(ctx.session);

    await render(
      ctx,
      successTemplate(
        'Mock Panic Sell Complete',
        `${result.message}\n\nSignature: ${result.signature}`,
      ),
      keyboards.homeOnly(),
    );

    return;
  }

  if (ctx.session.flow === 'sell_confirm' && data === 'sell:confirm') {
    const result = executeMockSell(
      ctx.session.selectedPosition ?? 'SOLX',
      ctx.session.selectedSellPercent ?? 100,
    );

    resetFlow(ctx.session);

    await render(
      ctx,
      successTemplate(
        'Mock Sell Complete',
        `${result.message}\n\nSignature: ${result.signature}`,
      ),
      keyboards.homeOnly(),
    );

    return;
  }

  if (data === 'sell:back') {
    ctx.session.flow = 'sell_percent';

    await render(
      ctx,
      sellPercentScreen(ctx.session.selectedPosition ?? 'SOLX'),
      keyboards.sellPercent(),
    );
  }
}
