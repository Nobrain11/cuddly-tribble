import type { BotContext } from '../context/bot-context.js';
import { resetFlow } from '../state/session.js';
import { keyboards } from '../ui/keyboards.js';
import { buyAmountScreen, buyConfirmScreen, buySlippageScreen } from '../ui/screens.js';
import { successTemplate } from '../ui/templates.js';
import { executeMockBuy } from '../services/trade.service.js';
import { render } from '../handlers/nav.js';

export async function startBuy(
  ctx: BotContext,
  token = 'SOLX',
): Promise<void> {
  ctx.session.selectedToken = token.toUpperCase();
  ctx.session.flow = 'buy_amount';

  await render(
    ctx,
    buyAmountScreen(ctx.session.selectedToken),
    keyboards.buyAmounts(),
  );
}

export async function handleBuy(
  ctx: BotContext,
  data: string,
): Promise<void> {
  if (data === 'buy:cancel') {
    resetFlow(ctx.session);
    await render(ctx, 'Trade cancelled.', keyboards.homeOnly());
    return;
  }

  if (
    ctx.session.flow === 'buy_amount' &&
    data.startsWith('buy:amount:')
  ) {
    const value = data.replace('buy:amount:', '');

    if (value === 'custom') {
      ctx.session.flow = 'buy_custom_amount';

      await render(
        ctx,
        '✏️ Custom Buy Amount\n\nSend the amount of SOL you want to spend.',
      );

      return;
    }

    ctx.session.selectedAmount = Number(value);
    ctx.session.flow = 'buy_slippage';

    await render(
      ctx,
      buySlippageScreen(
        ctx.session.selectedToken ?? 'SOLX',
        ctx.session.selectedAmount,
      ),
      keyboards.buySlippage(),
    );

    return;
  }

  if (
    ctx.session.flow === 'buy_slippage' &&
    data.startsWith('buy:slippage:')
  ) {
    const value = data.replace('buy:slippage:', '');

    if (value === 'custom') {
      ctx.session.flow = 'buy_custom_slippage';

      await render(
        ctx,
        '✏️ Custom Slippage\n\nSend slippage as a percentage, for example: 3',
      );

      return;
    }

    ctx.session.selectedSlippage = Number(value);

    await render(
      ctx,
      buySlippageScreen(
        ctx.session.selectedToken ?? 'SOLX',
        ctx.session.selectedAmount ?? 0,
        ctx.session.selectedSlippage,
      ),
      keyboards.buySlippage(),
    );

    return;
  }

  if (
    ctx.session.flow === 'buy_slippage' &&
    data === 'buy:continue'
  ) {
    if (!ctx.session.selectedSlippage) {
      await render(
        ctx,
        'Select slippage before continuing.',
        keyboards.buySlippage(),
      );

      return;
    }

    ctx.session.flow = 'buy_confirm';

    await render(
      ctx,
      buyConfirmScreen(
        ctx.session.selectedToken ?? 'SOLX',
        ctx.session.selectedAmount ?? 0,
        ctx.session.selectedSlippage,
        ctx.session.riskMode ?? 'Normal',
      ),
      keyboards.buyConfirm(),
    );

    return;
  }

  if (ctx.session.flow === 'buy_confirm' && data === 'buy:confirm') {
    const result = executeMockBuy(
      ctx.session.selectedToken ?? 'SOLX',
      ctx.session.selectedAmount ?? 0,
      ctx.session.selectedSlippage ?? 1,
    );

    resetFlow(ctx.session);

    await render(
      ctx,
      successTemplate(
        'Mock Buy Complete',
        `${result.message}\n\nSignature: ${result.signature}`,
      ),
      keyboards.homeOnly(),
    );
  }

  if (data === 'buy:back') {
    ctx.session.flow = 'buy_slippage';

    await render(
      ctx,
      buySlippageScreen(
        ctx.session.selectedToken ?? 'SOLX',
        ctx.session.selectedAmount ?? 0,
        ctx.session.selectedSlippage,
      ),
      keyboards.buySlippage(),
    );
  }
}
