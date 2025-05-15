import { Account } from '../../entity/account.entity';

export interface IAccountRepository {
  save(account: Account): Promise<void>;
}
