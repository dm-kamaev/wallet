import { Injectable } from '@nestjs/common';
import db from '../lib/db';

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
      const sourceAccount = await trx
        .selectFrom('accounts')
        .select('balance')
        .where('account_id', '=', sourceAccountId)
        .forUpdate()
        .executeTakeFirst();
      if (!sourceAccount) {
        throw new Error(`Not found account with id = ${sourceAccountId}`);
      }
      const targetAccount = await trx
        .selectFrom('accounts')
        .select('balance')
        .where('account_id', '=', targetAccountId)
        .forUpdate()
        .executeTakeFirst();

      if (!targetAccount) {
        throw new Error(`Not found account with id = ${targetAccountId}`);
      }
      const b1 = new Rub({ decimal: sourceAccount.balance + '' }).minus(
        new Rub({ decimal: amount + '' }),
      );
      await trx
        .updateTable('accounts')
        .set({ balance: b1.toDecimal() })
        .where('account_id', '=', sourceAccountId)
        .execute();
      // const b2 = targetAccount.balance + amount;

      const b2 = new Rub({ decimal: targetAccount.balance + '' }).plus(
        new Rub({ decimal: amount + '' }),
      );

      await trx
        .updateTable('accounts')
        .set({ balance: b2.toDecimal() })
        .where('account_id', '=', targetAccountId)
        .execute();

      console.log({ b1, b2 });
    });

    return { sourceAccountId, targetAccountId, amount };
  }
}

class Rub {
  public readonly val: number;
  constructor(input: { decimal: string } | { int: number }) {
    if ('decimal' in input) {
      this.val = parseFloat(input.decimal) * 100;
    } else if ('int' in input) {
      this.val = input.int;
    } else {
      throw new Error(`Invalid input ${JSON.stringify(input)}`);
    }
  }

  plus(amount: Rub) {
    return new Rub({ int: this.val + amount.val });
  }

  minus(amount: Rub) {
    return new Rub({ int: this.val - amount.val });
  }

  toDecimal() {
    return this.val / 100;
  }
}
