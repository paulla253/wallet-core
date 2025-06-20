import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { TransactionController } from 'src/controller/transaction.controller';
import { CreateTransactionUseCase } from 'src/core/use-case/create-transaction.use-case';
import {
  CreateTransactionUseCaseToken,
  TransactionRepositoryToken,
  TransactionUnitOfWorkToken,
} from '../token/transaction.token';
import { ITransactionUnitOfWork } from 'src/core/unit-of-work/transaction.uow-interface';
import { TransactionUnitOfWork } from 'src/infrastructure/unit-of-work/transaction.uow';
import { QueryRunner } from 'typeorm';
import { IAccountRepository } from 'src/core/_share/repository/account.repository.interface';
import { ITransactionRepository } from 'src/core/_share/repository/transaction.repository.interface';
import { AccountRepository } from 'src/infrastructure/database/typeorm/repository/account.repository';
import { AccountRepositoryToken } from '../token/account.token';
import { MYSQLDataSourceToken } from '../token/database.token';
import { TransactionRepository } from 'src/infrastructure/database/typeorm/repository/transaction.repository';

@Module({
  providers: [
    {
      provide: TransactionRepositoryToken,
      useFactory: (queryRunner: QueryRunner) => {
        return new TransactionRepository(queryRunner);
      },
      inject: [MYSQLDataSourceToken],
    },
    {
      provide: AccountRepositoryToken,
      useFactory: (queryRunner: QueryRunner) => {
        return new AccountRepository(queryRunner);
      },
      inject: [MYSQLDataSourceToken],
    },
    {
      provide: TransactionUnitOfWorkToken,
      useFactory: (
        queryRunner: QueryRunner,
        accountRepository: IAccountRepository,
        transactionRepository: ITransactionRepository,
      ) => {
        return new TransactionUnitOfWork(
          queryRunner,
          accountRepository,
          transactionRepository,
        );
      },
      inject: [
        MYSQLDataSourceToken,
        AccountRepositoryToken,
        TransactionRepositoryToken,
      ],
    },

    {
      provide: CreateTransactionUseCaseToken,
      useFactory: (uow: ITransactionUnitOfWork) => {
        return new CreateTransactionUseCase(uow);
      },
      inject: [TransactionUnitOfWorkToken],
    },
  ],
  exports: [],
  imports: [DatabaseModule],
  controllers: [TransactionController],
})
export class TransactionModule {}
