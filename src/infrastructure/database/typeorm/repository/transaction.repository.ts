import { QueryRunner } from 'typeorm';
import { ITransactionRepository } from '../../../../core/_share/repository/transaction.repository.interface';
import { Transaction } from '../../../../core/entity/transaction.entity';

export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly queryRunner: QueryRunner) {}

  async save(transaction: Transaction): Promise<void> {
    await this.queryRunner.query(
      `INSERT INTO transactions (id, account_id_from, account_id_to, amount, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [
        transaction.value.id,
        transaction.value.accountFrom.id,
        transaction.value.accountTo.id,
        transaction.value.amount,
        transaction.value.createdAt,
      ],
    );
  }
}
