import { Transaction } from './transaction.entity';
import { Client } from './client.entity';
import { Account } from './account.entity';

describe('[Entity] Transaction', () => {
  let clientFrom: Client;
  let clientTo: Client;
  let accountFrom: Account;
  let accountTo: Account;

  beforeEach(() => {
    clientFrom = new Client({ name: 'Alice', email: 'alice@example.com' });
    clientTo = new Client({ name: 'Bob', email: 'bob@example.com' });

    accountFrom = new Account(clientFrom);
    accountTo = new Account(clientTo);
  });

  it('should create a valid transaction and move funds', () => {
    accountFrom.credit(100);

    const transaction = new Transaction({
      accountFrom,
      accountTo,
      amount: 50,
    });

    expect(transaction).toBeDefined();
    expect(transaction.value.amount).toBe(50);
    expect(accountFrom.value.balance).toBe(50);
    expect(accountTo.value.balance).toBe(50);
    expect(transaction.value.createdAt).toBeInstanceOf(Date);
  });

  it('should throw error if amount is less than or equal to 0', () => {
    expect(
      () =>
        new Transaction({
          accountFrom,
          accountTo,
          amount: 0,
        }),
    ).toThrow('amount must be greater than zero');
  });

  it('should throw error if accountFrom has insufficient balance', () => {
    accountFrom.credit(20);

    expect(
      () =>
        new Transaction({
          accountFrom,
          accountTo,
          amount: 30,
        }),
    ).toThrow('insufficient funds');
  });

  it('should store correct accountFromId and accountToId', () => {
    accountFrom.credit(100);

    const transaction = new Transaction({
      accountFrom,
      accountTo,
      amount: 10,
    });

    expect(transaction.value.accountFromId).toBe(accountFrom.value.id);
    expect(transaction.value.accountToId).toBe(accountTo.value.id);
  });
});
