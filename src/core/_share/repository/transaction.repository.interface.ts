import { Transaction } from '../../entity/transaction.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
}
