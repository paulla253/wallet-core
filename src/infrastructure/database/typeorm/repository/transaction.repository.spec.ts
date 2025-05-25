import { DataSource } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from '../../../../core/entity/transaction.entity';
import { Account } from '../../../../core/entity/account.entity';
import { Client } from '../../../../core/entity/client.entity';
import ClientTableQuery from '../../query/client.query';
import AccountTableQuery from '../../query/account.query';
import TransactionTableQuery from '../../query/transaction.query ';

describe('[Repository] TransactionRepository', () => {
  let dataSource: DataSource;
  let transactionRepository: TransactionRepository;
  let clientA: Client;
  let clientB: Client;
  let accountFrom: Account;
  let accountTo: Account;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: false,
      entities: [],
    });

    await dataSource.initialize();

    await dataSource.query(ClientTableQuery.CREATE);

    await dataSource.query(AccountTableQuery.CREATE);

    await dataSource.query(TransactionTableQuery.CREATE);

    const query = dataSource.createQueryRunner();

    transactionRepository = new TransactionRepository(query);

    clientA = new Client({ name: 'Alice', email: 'alice@example.com' });
    clientB = new Client({ name: 'Bob', email: 'bob@example.com' });

    await dataSource.query(
      `INSERT INTO clients (id, name, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
      [
        clientA.value.id,
        clientA.value.name,
        clientA.value.email,
        clientA.value.createdAt,
      ],
    );

    await dataSource.query(
      `INSERT INTO clients (id, name, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
      [
        clientB.value.id,
        clientB.value.name,
        clientB.value.email,
        clientB.value.createdAt,
      ],
    );

    accountFrom = new Account(clientA);
    accountFrom.credit(1000);
    accountTo = new Account(clientB);
    accountTo.credit(500);

    await dataSource.query(
      `INSERT INTO accounts (id, client_id, balance, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
      [
        accountFrom.value.id,
        clientA.value.id,
        accountFrom.value.balance,
        accountFrom.value.createdAt,
      ],
    );

    await dataSource.query(
      `INSERT INTO accounts (id, client_id, balance, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
      [
        accountTo.value.id,
        clientB.value.id,
        accountTo.value.balance,
        accountTo.value.createdAt,
      ],
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create a transaction record in the database', async () => {
    const transaction = new Transaction({
      accountFrom,
      accountTo,
      amount: 200,
    });

    await transactionRepository.save(transaction);

    const result = await dataSource.query(
      `SELECT * FROM transactions WHERE id = ?`,
      [transaction.value.id],
    );

    expect(result.length).toBe(1);
    expect(result[0].account_id_from).toBe(accountFrom.value.id);
    expect(result[0].account_id_to).toBe(accountTo.value.id);
    expect(result[0].amount).toBe(200);
  });
});
