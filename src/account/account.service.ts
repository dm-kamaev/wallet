import { Injectable } from '@nestjs/common';
import db from '../lib/db';
import DbAccounts from '../dao/DaoAccounts';
import { NotFoundException } from '../exception';

@Injectable()
export class AccountService {
  async getAccount(id: string) {
    const account = await new DbAccounts(db).getByAccountId(id);

    if (!account) {
      throw new NotFoundException(`Not found account with id = ${id}`);
    }

    return { balance: account.balance };
  }
}
