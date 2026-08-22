import type { Telegraf } from 'telegraf';
import type { BotContext } from '../context/bot-context.js';
import { showHome, render } from './nav.js';
import { startBuy } from '../scenes/buy.js';
import { startSell } from '../scenes/sell.js';
import { showSniper } from '../scenes/sniper.js';
import { showCopy } from '../scenes/copy.js';
import { showWallet } from '../scenes/wallets.js';
import { showAlerts } from '../scenes/alerts.js';
import { showSettings } from '../scenes/settings.js';
import { keyboards } from '../ui/keyboards.js';
import { positionsScreen, watchlistScreen } from '../ui/screens.js';
import { getPositions } from '../services/market.service.js';

function commandArgument(ctx: BotContext): string | undefined {
  if (!ctx.message || !('text' in ctx.message)) {
    return undefined;
  }

  return ctx.message.text.split(/\s+/)[1];
}

export function registerCommands(
  bot: Telegraf<BotContext>,
): void {
  bot.start(showHome);
  bot.command('home', showHome);

  bot.command('buy', async (ctx) => {
    await startBuy(ctx, commandArgument(ctx) ?? 'SOLX');
  });

  bot.command('sell', startSell);
  bot.command('sniper', showSniper);
  bot.command('copy', showCopy);
  bot.command('wallet', showWallet);
  bot.command('alerts', showAlerts);
  bot.command('settings', showSettings);

  bot.command('positions', async (ctx) => {
    await render(
      ctx,
      positionsScreen(getPositions()),
      keyboards.backHome(),
    );
  });

  bot.command('watchlist', async (ctx) => {
    await render(
      ctx,
      watchlistScreen(ctx.session.watchlist),
      keyboards.backHome(),
    );
  });

  bot.command('help', async (ctx) => {
    await render(
      ctx,
      [
        '❓ MemeBot Help',
        '',
        '/start - Open home',
        '/buy SOLX - Start a buy',
        '/sell - Sell a position',
        '/positions - View positions',
        '/watchlist - View watchlist',
        '/sniper - Sniper controls',
        '/copy - Copy trading',
        '/wallet - Wallet screen',
        '/alerts - Alert settings',
        '/settings - Bot settings',
        '',
        'This build is UI-only and uses mock trades.',
      ].join('\n'),
      keyboards.homeOnly(),
    );
  });
}
