import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { NotFoundException } from '../exception';

import db from '../lib/db';

describe('AccountController', () => {
  let app: TestingModule;
  let accountController: AccountController;
  const account = {
    account_id: '9032',
    balance: 2.6,
  };

  beforeAll(async () => {
    await db.insertInto('accounts').values(account).execute();
  });

  afterAll(async () => {
    await db
      .deleteFrom('accounts')
      .where('account_id', '=', account.account_id)
      .execute();

    await db.destroy();
  });

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountController = app.get<AccountController>(AccountController);
  });

  afterEach(async () => {
    await app.close();
  });

  it('get balance', async () => {
    const { balance } = await accountController.getAccount(account.account_id);
    expect(balance).toBe(account.balance);
  });

  it('not found account', async () => {
    await expect(accountController.getAccount('3453534533534')).rejects.toThrow(
      NotFoundException,
    );
  });
});
