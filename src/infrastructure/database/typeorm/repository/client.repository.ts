import { IClientRepository } from '../../../../core/_share/repository/client.repository.interface';
import { Client } from '../../../../core/entity/client.entity';
import { QueryRunner } from 'typeorm';

export class ClientRepository implements IClientRepository {
  constructor(private readonly queryRunner: QueryRunner) {}

  async get(id: string): Promise<Client | null> {
    const result = await this.queryRunner.query(
      'SELECT id, name, email, created_at, updated_at FROM clients WHERE id = ?',
      [id],
    );

    if (result.length === 0) {
      return null;
    }

    const row = result[0];
    const client = new Client({
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });

    return client;
  }

  async save(client: Client): Promise<void> {
    await this.queryRunner.query(
      'INSERT INTO clients (id, name, email, created_at, updated_at) VALUES (?, ?, ?, ?,?)',
      [
        client.value.id,
        client.value.name,
        client.value.email,
        client.value.createdAt,
        client.value.updatedAt,
      ],
    );
  }
}
