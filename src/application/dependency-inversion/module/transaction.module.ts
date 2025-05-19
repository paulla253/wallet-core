import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { TransactionController } from 'src/controller/transaction.controller';

@Module({
  providers: [],
  exports: [],
  imports: [DatabaseModule],
  controllers: [TransactionController],
})
export class TransactionModule {}
