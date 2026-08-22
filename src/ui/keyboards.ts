import { Markup } from 'telegraf';

export const keyboards = {
  home: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('🟢 Buy', 'home:buy'),
        Markup.button.callback('🔴 Sell', 'home:sell'),
      ],
      [
        Markup.button.callback('📊 Positions', 'home:positions'),
        Markup.button.callback('👀 Watchlist', 'home:watchlist'),
      ],
      [
        Markup.button.callback('🎯 Sniper', 'home:sniper'),
        Markup.button.callback('🧠 Copy Trade', 'home:copy'),
      ],
      [
        Markup.button.callback('💼 Wallet', 'home:wallet'),
        Markup.button.callback('🔔 Alerts', 'home:alerts'),
      ],
      [
        Markup.button.callback('⚙️ Settings', 'home:settings'),
        Markup.button.callback('❓ Help', 'home:help'),
      ],
    ]),

  homeOnly: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('🏠 Home', 'nav:home')],
    ]),

  backHome: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('⬅️ Back', 'nav:home'),
        Markup.button.callback('🏠 Home', 'nav:home'),
      ],
    ]),

  buyAmounts: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('0.1 SOL', 'buy:amount:0.1'),
        Markup.button.callback('0.25 SOL', 'buy:amount:0.25'),
      ],
      [
        Markup.button.callback('0.5 SOL', 'buy:amount:0.5'),
        Markup.button.callback('1 SOL', 'buy:amount:1'),
      ],
      [
        Markup.button.callback('2 SOL', 'buy:amount:2'),
        Markup.button.callback('✏️ Custom', 'buy:amount:custom'),
      ],
      [
        Markup.button.callback('❌ Cancel', 'buy:cancel'),
      ],
    ]),

  buySlippage: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('0.5%', 'buy:slippage:0.5'),
        Markup.button.callback('1%', 'buy:slippage:1'),
        Markup.button.callback('2%', 'buy:slippage:2'),
      ],
      [
        Markup.button.callback('5%', 'buy:slippage:5'),
        Markup.button.callback('✏️ Custom', 'buy:slippage:custom'),
      ],
      [
        Markup.button.callback('✅ Continue', 'buy:continue'),
        Markup.button.callback('❌ Cancel', 'buy:cancel'),
      ],
    ]),

  buyConfirm: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('✅ Place Buy', 'buy:confirm')],
      [
        Markup.button.callback('⬅️ Back', 'buy:back'),
        Markup.button.callback('❌ Cancel', 'buy:cancel'),
      ],
    ]),

  sellPositions: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('SOLX +32%', 'sell:position:SOLX'),
      ],
      [
        Markup.button.callback('PEPE +7%', 'sell:position:PEPE'),
      ],
      [
        Markup.button.callback('WIF -4%', 'sell:position:WIF'),
      ],
      [
        Markup.button.callback('❌ Cancel', 'sell:cancel'),
      ],
    ]),

  sellPercent: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('25%', 'sell:percent:25'),
        Markup.button.callback('50%', 'sell:percent:50'),
      ],
      [
        Markup.button.callback('75%', 'sell:percent:75'),
        Markup.button.callback('100%', 'sell:percent:100'),
      ],
      [
        Markup.button.callback('🚨 Panic Sell', 'sell:panic'),
      ],
      [
        Markup.button.callback('❌ Cancel', 'sell:cancel'),
      ],
    ]),

  sellConfirm: () =>
    Markup.inlineKeyboard([
      [Markup.button.callback('✅ Place Sell', 'sell:confirm')],
      [
        Markup.button.callback('⬅️ Back', 'sell:back'),
        Markup.button.callback('❌ Cancel', 'sell:cancel'),
      ],
    ]),

  sniper: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('🟢 Enable', 'sniper:enable'),
        Markup.button.callback('⏸ Pause', 'sniper:pause'),
      ],
      [
        Markup.button.callback('🆕 New Pair', 'sniper:new_pair'),
        Markup.button.callback('💧 Liquidity Add', 'sniper:liquidity'),
      ],
      [
        Markup.button.callback('🔥 Trending', 'sniper:trending'),
        Markup.button.callback('⚙️ Filters', 'sniper:filters'),
      ],
      [
        Markup.button.callback('🏠 Home', 'nav:home'),
      ],
    ]),

  copy: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('➕ Add Wallet', 'copy:add'),
        Markup.button.callback('📋 Wallets', 'copy:list'),
      ],
      [
        Markup.button.callback('💰 Allocation', 'copy:allocation'),
        Markup.button.callback('🤖 Auto-Sell', 'copy:autosell'),
      ],
      [
        Markup.button.callback('⏸ Pause', 'copy:pause'),
        Markup.button.callback('▶️ Resume', 'copy:resume'),
      ],
      [
        Markup.button.callback('🏠 Home', 'nav:home'),
      ],
    ]),

  wallets: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('📥 Deposit', 'wallet:deposit'),
        Markup.button.callback('📤 Withdraw', 'wallet:withdraw'),
      ],
      [
        Markup.button.callback('🔄 Rotate Wallet', 'wallet:rotate'),
      ],
      [
        Markup.button.callback('🏠 Home', 'nav:home'),
      ],
    ]),

  alerts: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('📈 Price Alert', 'alert:price'),
        Markup.button.callback('👛 Wallet Alert', 'alert:wallet'),
      ],
      [
        Markup.button.callback('🟢 Entry Alerts', 'alert:entry'),
        Markup.button.callback('🔴 Exit Alerts', 'alert:exit'),
      ],
      [
        Markup.button.callback('🚨 Rug Warnings', 'alert:rug'),
        Markup.button.callback('📊 PnL Alerts', 'alert:pnl'),
      ],
      [
        Markup.button.callback('🏠 Home', 'nav:home'),
      ],
    ]),

  settings: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('💰 Trade Size', 'settings:size'),
        Markup.button.callback('📉 Slippage', 'settings:slippage'),
      ],
      [
        Markup.button.callback('🛡 Risk Mode', 'settings:risk'),
        Markup.button.callback('🔔 Alerts', 'settings:alerts'),
      ],
      [
        Markup.button.callback('🚨 Emergency Stop', 'settings:emergency'),
      ],
      [
        Markup.button.callback('🏠 Home', 'nav:home'),
      ],
    ]),

  risk: () =>
    Markup.inlineKeyboard([
      [
        Markup.button.callback('🟢 Safe', 'settings:risk:Safe'),
        Markup.button.callback('🟡 Normal', 'settings:risk:Normal'),
      ],
      [
        Markup.button.callback('🔴 Aggressive', 'settings:risk:Aggressive'),
      ],
      [
        Markup.button.callback('⬅️ Back', 'settings:back'),
      ],
    ]),
};
