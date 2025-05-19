import { DataSource } from 'typeorm';
import { AccountRepository } from './account.repository';
import { Client } from '../../../../core/entity/client.entity';
import { Account } from '../../../../core/entity/account.entity';
import AccountTableQuery from '../../query/account.query';
import ClientTableQuery from '../../query/client.query';

describe('[Repository] AccountRepository', () => {
  let dataSource: DataSource;
  let accountRepository: AccountRepository;
  let client: Client;

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

    accountRepository = new AccountRepository(dataSource);

    client = new Client({ name: 'Bob', email: 'bob@example.com' });
    await dataSource.query(
      `INSERT INTO clients (id, name, email, created_at,updated_at) VALUES (?, ?, ?, ?, ?)`,
      [
        client.value.id,
        client.value.name,
        client.value.email,
        client.value.createdAt,
        client.value.updatedAt,
      ],
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should save and retrieve an account with client data', async () => {
    const account = new Account(client);
    account.credit(500);

    await accountRepository.save(account);

    const found = await accountRepository.findById(account.value.id);

    expect(found).not.toBeNull();
    expect(found.value.balance).toBe(500);
    expect(found.value.client.name).toBe('Bob');
  });

  it('should update account balance', async () => {
    const account = new Account(client);
    account.credit(100);
    await accountRepository.save(account);

    account.credit(50);
    await accountRepository.updateBalance(account);

    const updated = await accountRepository.findById(account.value.id);
    expect(updated.value.balance).toBe(150);
  });

  it('should return null for non-existent account', async () => {
    const result = await accountRepository.findById('non-existent-id');
    expect(result).toBeNull();
  });
});
