import type { BotContext } from '../context/bot-context.js';
import { getBalance, getDepositAddress } from '../services/wallet.service.js';
import { keyboards } from '../ui/keyboards.js';
import { walletScreen } from '../ui/screens.js';
import { infoTemplate } from '../ui/templates.js';
import { render } from '../handlers/nav.js';

export async function showWallet(ctx: BotContext): Promise<void> {
  await render(
    ctx,
    walletScreen(getBalance()),
    keyboards.wallets(),
  );
}

export async function handleWallet(
  ctx: BotContext,
  data: string,
): Promise<void> {
  if (data === 'wallet:deposit') {
    await render(
      ctx,
      infoTemplate(
        'Deposit Address',
        `Send SOL to:\n\n${getDepositAddress()}`,
      ),
      keyboards.backHome(),
    );

    return;
  }

  if (data === 'wallet:withdraw') {
    ctx.session.flow = 'wallet_withdraw';

    await render(
      ctx,
      '📤 Withdraw\n\nWithdrawal flow is disabled in this UI-only build.',
      keyboards.backHome(),
    );

    return;
  }

  if (data === 'wallet:rotate') {
    await render(
      ctx,
      infoTemplate(
        'Rotate Wallet',
        'Wallet rotation requires a secure wallet service before activation.',
      ),
      keyboards.backHome(),
    );
  }
}
