import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

import db from '../lib/db';

describe('TransferController', () => {
  let app: TestingModule;
  let transferController: TransferController;
  const data = {
    account_id: '9032',
    balance: 2.6,
  };

  beforeAll(async () => {
    await db.insertInto('accounts').values(data).execute();
  });

  afterAll(async () => {
    await db
      .deleteFrom('accounts')
      .where('account_id', '=', data.account_id)
      .execute();
    await db.destroy();
  });

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [TransferService],
    }).compile();

    transferController = app.get<TransferController>(TransferController);
  });

  afterEach(async () => {
    await app.close();
  });

  it('get balance', async () => {
    // await transferController.transfer({ } as any);
    // expect(balance).toBe(data.balance);
  });

  // it('not found account', async () => {
  //   await expect(
  //     accountController.getAccount('3453534533534'),
  //   ).rejects.toThrow(Error);
  // });
});
