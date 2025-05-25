import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { QueryRunner } from 'typeorm';
import { SQLLiteDataSourceToken } from 'src/application/dependency-inversion/token/database.token';
import { ClientRepositoryToken } from 'src/application/dependency-inversion/token/client.token';
import { AccountController } from 'src/controller/account.controller';
import {
  AccountRepositoryToken,
  CreateAccountUseCaseToken,
} from 'src/application/dependency-inversion/token/account.token';
import { CreateAccountUseCase } from 'src/core/use-case/create-account.use-case';
import { ClientRepository } from 'src/infrastructure/database/typeorm/repository/client.repository';
import { AccountRepository } from 'src/infrastructure/database/typeorm/repository/account.repository';

@Module({
  providers: [
    {
      provide: ClientRepositoryToken,
      useFactory: (queryRunner: QueryRunner) => {
        return new ClientRepository(queryRunner);
      },
      inject: [SQLLiteDataSourceToken],
    },
    {
      provide: AccountRepositoryToken,
      useFactory: (queryRunner: QueryRunner) => {
        return new AccountRepository(queryRunner);
      },
      inject: [SQLLiteDataSourceToken],
    },
    {
      provide: CreateAccountUseCaseToken,
      useFactory: (
        accountRepository: AccountRepository,
        clientRepository: ClientRepository,
      ) => {
        return new CreateAccountUseCase(accountRepository, clientRepository);
      },
      inject: [AccountRepositoryToken, ClientRepositoryToken],
    },
  ],
  exports: [CreateAccountUseCaseToken],
  imports: [DatabaseModule],
  controllers: [AccountController],
})
export class AccountModule {}
