import { Module } from '@nestjs/common';
import { ClientModule } from './client.module';
import { AccountModule } from './account.module';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [ClientModule, AccountModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
