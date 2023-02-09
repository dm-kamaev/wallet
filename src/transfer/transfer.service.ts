import * as Decimal from 'decimal';
import { Injectable } from '@nestjs/common';
import db from '../lib/db';
import DaoAccounts from '../dao/DaoAccounts';
import {
  NotFoundException,
  InsufficientFundException,
  OverlimitException,
} from '../exception';

@Injectable()
export class TransferService {
  async transfer({
    sourceAccountId,
    targetAccountId,
    amount,
  }: {
    sourceAccountId: string;
    targetAccountId: string;
    amount: number;
  }) {
    await db.transaction().execute(async (trx) => {
      const daoAccounts = new DaoAccounts(trx);
      const [sourceAccount, targetAccount] = await Promise.all([
        daoAccounts.getByAccountId(sourceAccountId),
        daoAccounts.getByAccountId(targetAccountId),
      ]);

      if (!sourceAccount) {
        throw new NotFoundException(
          `Not found account with id = ${sourceAccountId}`,
        );
      }

      if (!targetAccount) {
        throw new NotFoundException(
          `Not found account with id = ${targetAccountId}`,
        );
      }

      const sourceBalance: number = new Decimal(sourceAccount.balance + '')
        .sub(amount + '')
        .toNumber();

      if (sourceBalance <= 0) {
        throw new InsufficientFundException(
          `Insufficient fund on account (account_id = ${sourceAccountId}) for transfer (amount = ${amount})`,
        );
      }

      await daoAccounts.updateAmount({
        accountId: sourceAccountId,
        balance: sourceBalance,
      });

      const targetBalance: number = new Decimal(targetAccount.balance + '')
        .add(amount + '')
        .toNumber();

      if (targetBalance > 9_999_999_999.99) {
        throw new OverlimitException(
          `Overlimit, max value for account (account_id = ${targetAccountId}) is ${9_999_999_999.99}`,
        );
      }

      await daoAccounts.updateAmount({
        accountId: targetAccountId,
        balance: targetBalance,
      });
    });
  }
}
