import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import {
  InsufficientFundException,
  NotFoundException,
  OverlimitException,
} from '../exception';

import db from '../lib/db';

describe('TransferController', () => {
  let app: TestingModule;
  let transferController: TransferController;
  const concurrentData = {
    sourceAccount: {
      account_id: '9032',
      balance: 101,
    },
    targetAccount: {
      account_id: '7245',
      balance: 0.15,
    },
  } as const;

  const invalidaActionData = {
    sourceAccount: {
      account_id: '8501',
      balance: 101,
    },
    targetAccount: {
      account_id: '2568',
      balance: 0.15,
    },
  } as const;

  const overLimitData = {
    sourceAccount: {
      account_id: '9056',
      balance: 2,
    },
    targetAccount: {
      account_id: '3200',
      balance: 9_999_999_999.99,
    },
  } as const;

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

  beforeAll(async () => {
    await db
      .insertInto('accounts')
      .values([
        concurrentData.sourceAccount,
        concurrentData.targetAccount,
        invalidaActionData.sourceAccount,
        invalidaActionData.targetAccount,
        overLimitData.sourceAccount,
        overLimitData.targetAccount,
      ])
      .execute();
  });

  afterAll(async () => {
    await db
      .deleteFrom('accounts')
      .where('account_id', 'in', [
        concurrentData.sourceAccount.account_id,
        concurrentData.targetAccount.account_id,
        invalidaActionData.sourceAccount.account_id,
        invalidaActionData.targetAccount.account_id,
        overLimitData.sourceAccount.account_id,
        overLimitData.targetAccount.account_id,
      ])
      .execute();
    await db.destroy();
  });

  it('concurrent transfer', async () => {
    const { sourceAccount, targetAccount } = concurrentData;
    await Promise.all([
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 10 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 1.99 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 35 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 18.01 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 4 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 2 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 10 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 8 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 7 },
      ),
      transferController.transfer(
        sourceAccount.account_id,
        targetAccount.account_id,
        { amount: 4 },
      ),
    ]);

    const { balance: sourceBalance } = await db
      .selectFrom('accounts')
      .select(['balance'])
      .where('account_id', '=', sourceAccount.account_id)
      .executeTakeFirst();

    const { balance: targetBalance } = await db
      .selectFrom('accounts')
      .select(['balance'])
      .where('account_id', '=', targetAccount.account_id)
      .executeTakeFirst();

    expect(sourceBalance).toBe(1);
    expect(targetBalance).toBe(100.15);
  });

  it('insufficient funds of account', async () => {
    expect(
      transferController.transfer(
        invalidaActionData.sourceAccount.account_id,
        invalidaActionData.targetAccount.account_id,
        { amount: 1000 },
      ),
    ).rejects.toThrow(InsufficientFundException);
  });

  it('not found source account', async () => {
    expect(
      transferController.transfer(
        '10935',
        invalidaActionData.targetAccount.account_id,
        {
          amount: 1,
        },
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('not found target account', async () => {
    expect(
      transferController.transfer(
        invalidaActionData.sourceAccount.account_id,
        '10935',
        {
          amount: 1,
        },
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('overlimit', async () => {
    expect(
      transferController.transfer(
        overLimitData.sourceAccount.account_id,
        overLimitData.targetAccount.account_id,
        {
          amount: 1,
        },
      ),
    ).rejects.toThrow(OverlimitException);
  });
});
