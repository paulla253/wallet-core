import { Module } from '@nestjs/common';
import { CreateClientUseCase } from 'src/core/use-case/create-client.use-case';
import { DatabaseModule } from './database.module';
import { DataSource } from 'typeorm';
import { ClientController } from 'src/controller/client.controller';
import { SQLLiteDataSourceToken } from 'src/application/dependency-inversion/token/database.token';
import {
  ClientRepositoryToken,
  CreateClientUseCaseToken,
} from 'src/application/dependency-inversion/token/client.token';
import { ClientRepository } from 'src/infrastructure/database/typeorm/repository/client.repository';

@Module({
  providers: [
    {
      provide: ClientRepositoryToken,
      useFactory: (dataSource: DataSource) => {
        return new ClientRepository(dataSource);
      },
      inject: [SQLLiteDataSourceToken],
    },
    {
      provide: CreateClientUseCaseToken,
      useFactory: (clientRepository: ClientRepository) => {
        return new CreateClientUseCase(clientRepository);
      },
      inject: [ClientRepositoryToken],
    },
  ],
  exports: [CreateClientUseCaseToken],
  imports: [DatabaseModule],
  controllers: [ClientController],
})
export class ClientModule {}
