import { Telegraf, session } from 'telegraf';
import type { BotContext, SessionData } from './context/bot-context.js';
import { env } from './config/env.js';
import { defaultSession } from './state/session.js';

export function createBot(): Telegraf<BotContext> {
  const bot = new Telegraf<BotContext>(env.BOT_TOKEN);

  bot.use(
    session<SessionData, BotContext>({
      defaultSession,
    }),
  );

  return bot;
}
