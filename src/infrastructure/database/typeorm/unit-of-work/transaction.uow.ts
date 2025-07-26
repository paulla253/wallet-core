import { IAccountRepository } from 'src/core/_share/repository/account.repository.interface';
import { ITransactionRepository } from 'src/core/_share/repository/transaction.repository.interface';
import { ITransactionUnitOfWork } from 'src/core/_share/unit-of-work/transaction-uow.interface';
import { BaseUnitOfWork } from 'src/infrastructure/database/typeorm/unit-of-work/basic.uow';
import { QueryRunner } from 'typeorm';

export class TransactionUnitOfWork
  extends BaseUnitOfWork
  implements ITransactionUnitOfWork
{
  constructor(
    queryRunner: QueryRunner,
    readonly accountRepository: IAccountRepository,
    readonly transactionRepository: ITransactionRepository,
  ) {
    super(queryRunner);
  }
}
