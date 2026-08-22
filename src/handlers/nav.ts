import type { BotContext } from '../context/bot-context.js';
import { getBalance } from '../services/wallet.service.js';
import { getPositions } from '../services/market.service.js';
import { homeScreen } from '../ui/screens.js';
import { keyboards } from '../ui/keyboards.js';

export async function render(
  ctx: BotContext,
  text: string,
  keyboard?: ReturnType<typeof keyboards.home>,
): Promise<void> {
  try {
    const isCallback =
      Boolean(ctx.callbackQuery) &&
      'message' in ctx.callbackQuery! &&
      Boolean(ctx.callbackQuery.message);

    if (isCallback) {
      await ctx.editMessageText(text, keyboard);
    } else {
      await ctx.reply(text, keyboard);
    }
  } catch {
    await ctx.reply(text, keyboard);
  }
}

export async function showHome(ctx: BotContext): Promise<void> {
  await render(
    ctx,
    homeScreen(ctx.session, getBalance(), getPositions()),
    keyboards.home(),
  );
}

export async function handleTextInput(ctx: BotContext): Promise<void> {
  if (!ctx.message || !('text' in ctx.message)) {
    return;
  }

  const text = ctx.message.text.trim();

  if (ctx.session.flow === 'buy_custom_amount') {
    const amount = Number(text);

    if (!Number.isFinite(amount) || amount <= 0) {
      await ctx.reply('Send a valid amount greater than zero.');
      return;
    }

    ctx.session.selectedAmount = amount;
    ctx.session.flow = 'buy_slippage';

    await ctx.reply(
      `Amount set to ${amount} SOL. Now choose slippage with the buttons.`,
      keyboards.buySlippage(),
    );

    return;
  }

  if (ctx.session.flow === 'buy_custom_slippage') {
    const slippage = Number(text);

    if (!Number.isFinite(slippage) || slippage <= 0 || slippage > 50) {
      await ctx.reply('Send slippage between 0.1 and 50.');
      return;
    }

    ctx.session.selectedSlippage = slippage;
    ctx.session.flow = 'buy_slippage';

    await ctx.reply(
      `Slippage set to ${slippage}%. Tap Continue.`,
      keyboards.buySlippage(),
    );

    return;
  }

  if (ctx.session.flow === 'copy_add_wallet') {
    if (text.length < 20) {
      await ctx.reply('That wallet address looks too short.');
      return;
    }

    ctx.session.trackedWallets.push(text);
    ctx.session.flow = 'idle';

    await ctx.reply(
      'Wallet added to copy trading.',
      keyboards.homeOnly(),
    );

    return;
  }

  if (ctx.session.flow === 'copy_allocation') {
    const allocation = Number(text);

    if (!Number.isFinite(allocation) || allocation <= 0 || allocation > 100) {
      await ctx.reply('Send an allocation between 1 and 100.');
      return;
    }

    ctx.session.flow = 'idle';

    await ctx.reply(
      `Copy allocation set to ${allocation}%.`,
      keyboards.homeOnly(),
    );

    return;
  }

  if (ctx.session.flow === 'settings_trade_size') {
    const amount = Number(text);

    if (!Number.isFinite(amount) || amount <= 0) {
      await ctx.reply('Send a valid trade size greater than zero.');
      return;
    }

    ctx.session.tradeSize = amount;
    ctx.session.flow = 'idle';

    await ctx.reply(
      `Default trade size set to ${amount} SOL.`,
      keyboards.homeOnly(),
    );

    return;
  }

  if (ctx.session.flow === 'settings_slippage') {
    const slippage = Number(text);

    if (!Number.isFinite(slippage) || slippage <= 0 || slippage > 50) {
      await ctx.reply('Send slippage between 0.1 and 50.');
      return;
    }

    ctx.session.flow = 'idle';

    await ctx.reply(
      `Default slippage set to ${slippage}%.`,
      keyboards.homeOnly(),
    );
  }
}
