import { IAccountRepository } from 'src/core/_share/repository/account.repository.interface';
import { ITransactionRepository } from 'src/core/_share/repository/transaction.repository.interface';
import { ITransactionUnitOfWork } from 'src/core/unit-of-work/transaction.uow-interface';
import { QueryRunner } from 'typeorm';

export class TransactionUnitOfWork implements ITransactionUnitOfWork {
  constructor(
    private queryRunner: QueryRunner,
    readonly accountRepository: IAccountRepository,
    readonly transactionRepository: ITransactionRepository,
  ) {}

  async start(): Promise<void> {
    if (this.queryRunner) {
      throw new Error('UnitOfWork já foi iniciado.');
    }

    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async complete(): Promise<void> {
    if (!this.queryRunner) {
      throw new Error('QueryRunner não foi iniciado.');
    }

    try {
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.rollback();
      throw error;
    } finally {
      await this.release();
    }
  }

  async rollback(): Promise<void> {
    if (!this.queryRunner) {
      return;
    }

    try {
      await this.queryRunner.rollbackTransaction();
    } catch (error) {
      console.error('Erro ao fazer rollback da transação:', error);
    } finally {
      await this.release();
    }
  }

  private async release(): Promise<void> {
    if (this.queryRunner) {
      try {
        await this.queryRunner.release();
      } catch (error) {
        console.error('Erro ao liberar o QueryRunner:', error);
      } finally {
        this.queryRunner = null;
      }
    }
  }
}
