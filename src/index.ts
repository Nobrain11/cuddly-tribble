import { createBot } from './bot.js';
import { registerCommands } from './handlers/commands.js';
import { registerCallbacks } from './handlers/callbacks.js';
import { handleTextInput } from './handlers/nav.js';

const bot = createBot();

registerCommands(bot);
registerCallbacks(bot);

bot.on('text', handleTextInput);

bot.catch((error, ctx) => {
  console.error('Bot error:', error);

  ctx.reply(
    'Something went wrong. Your funds were not affected. Please try again.',
  ).catch(() => undefined);
});

await bot.telegram.setMyCommands([
  { command: 'start', description: 'Open the bot' },
  { command: 'buy', description: 'Buy a token' },
  { command: 'sell', description: 'Sell a position' },
  { command: 'positions', description: 'View positions' },
  { command: 'watchlist', description: 'View watchlist' },
  { command: 'sniper', description: 'Open sniper controls' },
  { command: 'copy', description: 'Open copy trading' },
  { command: 'wallet', description: 'View wallet' },
  { command: 'alerts', description: 'Manage alerts' },
  { command: 'settings', description: 'Open settings' },
  { command: 'help', description: 'Show help' },
]);

await bot.launch();

console.log('MemeBot is running');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
