import { DB, TRX } from '../lib/db';

export default class DaoAccounts {
  constructor(private readonly db: DB | TRX) {}

  async getByAccountId(
    accountId: string,
  ): Promise<{ account_id: string; balance: number }> {
    return await this.db
      .selectFrom('accounts')
      .select(['account_id', 'balance'])
      .where('account_id', '=', accountId)
      .forUpdate()
      .executeTakeFirst();
  }

  async updateAmount({
    accountId,
    balance,
  }: {
    accountId: string;
    balance: number;
  }) {
    await this.db
      .updateTable('accounts')
      .set({ balance })
      .where('account_id', '=', accountId)
      .execute();
  }
}
