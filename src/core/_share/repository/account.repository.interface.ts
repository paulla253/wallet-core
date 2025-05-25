import { Account } from '../../entity/account.entity';

export interface IAccountRepository {
  save(account: Account): Promise<void>;
  findById(id: string): Promise<Account>;
  updateBalance(account: Account): Promise<void>;
}
