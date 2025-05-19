import { IAccountRepository } from '../../../../core/_share/repository/account.repository.interface';
import { Account } from '../../../../core/entity/account.entity';
import { Client } from '../../../../core/entity/client.entity';
import { DataSource } from 'typeorm';

export class AccountRepository implements IAccountRepository {
  constructor(private dataSource: DataSource) {}

  async findById(id: string): Promise<Account | null> {
    const result = await this.dataSource.query(
      `SELECT 
        a.id AS account_id,
        a.client_id,
        a.balance,
        a.created_at AS account_created_at,
        c.id AS client_id,
        c.name,
        c.email,
        c.created_at AS client_created_at,
        c.updated_at AS client_updated_at
       FROM accounts a
       INNER JOIN clients c ON a.client_id = c.id
       WHERE a.id = ?`,
      [id],
    );

    if (result.length === 0) return null;

    const row = result[0];

    const client = new Client({
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: row.client_created_at,
      updatedAt: row.client_updated_at,
    });

    const account = new Account(client);
    account.credit(row.balance);

    return account;
  }

  async save(account: Account): Promise<void> {
    await this.dataSource.query(
      `INSERT INTO accounts (id, client_id, balance, created_at,updated_at) VALUES (?, ?, ?, ?, ?)`,
      [
        account.value.id,
        account.value.client.id,
        account.value.balance,
        account.value.createdAt,
        account.value.updatedAt,
      ],
    );
  }

  async updateBalance(account: Account): Promise<void> {
    await this.dataSource.query(
      `UPDATE accounts SET balance = ? WHERE id = ?`,
      [account.value.balance, account.value.id],
    );
  }
}
