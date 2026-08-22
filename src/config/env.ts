import 'dotenv/config';

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing from your .env file');
}

export const env = {
  BOT_TOKEN,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
