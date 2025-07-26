import { QueryRunner } from 'typeorm';

export abstract class BaseUnitOfWork {
  constructor(protected readonly queryRunner: QueryRunner) {}

  async start(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async complete(): Promise<void> {
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
    try {
      await this.queryRunner.rollbackTransaction();
    } catch (error) {
      console.error('Erro ao fazer rollback da transação:', error);
    } finally {
      await this.release();
    }
  }

  protected async release(): Promise<void> {
    try {
      await this.queryRunner.release();
    } catch (error) {
      console.error('Erro ao liberar o QueryRunner:', error);
    }
  }
}
