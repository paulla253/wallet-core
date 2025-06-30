import { IAccountRepository } from '../_share/repository/account.repository.interface';
import { ITransactionRepository } from '../_share/repository/transaction.repository.interface';
import { IUnitOfWork } from './unit-of-work.interface';

export interface ITransactionUnitOfWork extends IUnitOfWork {
  accountRepository: IAccountRepository;
  transactionRepository: ITransactionRepository;
}
