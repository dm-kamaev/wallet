import { Injectable } from '@nestjs/common';
import db from '../lib/db';

@Injectable()
export class AccountService {
  async getAccount(id: string) {
    const account = await db
      .selectFrom('accounts')
      .select(['account_id', 'balance'])
      .where('account_id', '=', id)
      .executeTakeFirst();

    console.log(account);

    const result2 = await db
      .selectFrom('accounts')
      .select(['account_id', 'balance'])
      .execute();
    console.log(result2);


    return { balance: account.balance };
  }

}
