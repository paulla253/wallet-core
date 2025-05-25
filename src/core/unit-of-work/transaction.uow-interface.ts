import { IAccountRepository } from '../_share/repository/account.repository.interface';
import { ITransactionRepository } from '../_share/repository/transaction.repository.interface';

export interface ITransactionUnitOfWork {
  accountRepository: IAccountRepository;
  transactionRepository: ITransactionRepository;
  start(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;
}
