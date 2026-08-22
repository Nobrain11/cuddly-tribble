import type { Telegraf } from 'telegraf';
import type { BotContext } from '../context/bot-context.js';
import { showHome, render } from './nav.js';
import { startBuy, handleBuy } from '../scenes/buy.js';
import { startSell, handleSell } from '../scenes/sell.js';
import { showSniper, handleSniper } from '../scenes/sniper.js';
import { showCopy, handleCopy } from '../scenes/copy.js';
import { showWallet, handleWallet } from '../scenes/wallets.js';
import { showAlerts, handleAlerts } from '../scenes/alerts.js';
import { showSettings, handleSettings } from '../scenes/settings.js';
import { keyboards } from '../ui/keyboards.js';
import { positionsScreen, watchlistScreen } from '../ui/screens.js';
import { getPositions } from '../services/market.service.js';
import { scanToken } from '../services/safety.service.js';

export function registerCallbacks(
  bot: Telegraf<BotContext>,
): void {
  bot.on('callback_query', async (ctx) => {
    const callback = ctx.callbackQuery;

    if (!('data' in callback)) {
      return;
    }

    const data = callback.data;

    await ctx.answerCbQuery();

    if (data === 'nav:home') {
      await showHome(ctx);
      return;
    }

    if (data === 'home:buy') {
      await startBuy(ctx);
      return;
    }

    if (data === 'home:sell') {
      await startSell(ctx);
      return;
    }

    if (data === 'home:positions') {
      await render(
        ctx,
        positionsScreen(getPositions()),
        keyboards.backHome(),
      );
      return;
    }

    if (data === 'home:watchlist') {
      await render(
        ctx,
        watchlistScreen(ctx.session.watchlist),
        keyboards.backHome(),
      );
      return;
    }

    if (data === 'home:sniper') {
      await showSniper(ctx);
      return;
    }

    if (data === 'home:copy') {
      await showCopy(ctx);
      return;
    }

    if (data === 'home:wallet') {
      await showWallet(ctx);
      return;
    }

    if (data === 'home:alerts') {
      await showAlerts(ctx);
      return;
    }

    if (data === 'home:settings') {
      await showSettings(ctx);
      return;
    }

    if (data === 'home:help') {
      await render(
        ctx,
        'Use the buttons or slash commands to control the bot.',
        keyboards.homeOnly(),
      );
      return;
    }

    if (data.startsWith('buy:')) {
      await handleBuy(ctx, data);
      return;
    }

    if (data.startsWith('sell:')) {
      await handleSell(ctx, data);
      return;
    }

    if (data.startsWith('sniper:')) {
      await handleSniper(ctx, data);
      return;
    }

    if (data.startsWith('copy:')) {
      await handleCopy(ctx, data);
      return;
    }

    if (data.startsWith('wallet:')) {
      await handleWallet(ctx, data);
      return;
    }

    if (data.startsWith('alert:')) {
      await handleAlerts(ctx, data);
      return;
    }

    if (data.startsWith('settings:')) {
      await handleSettings(ctx, data);
      return;
    }

    if (data === 'token:safety') {
      const result = scanToken(ctx.session.selectedToken ?? 'SOLX');

      await render(
        ctx,
        [
          '🛡 Token Safety Scan',
          '',
          `Score: ${result.score}/100`,
          `Risk: ${result.label}`,
          '',
          ...result.warnings.map((warning) => `• ${warning}`),
        ].join('\n'),
        keyboards.backHome(),
      );
    }
  });
}
