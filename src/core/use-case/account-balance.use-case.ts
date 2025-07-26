import { IAccountRepository } from '../_share/repository/account.repository.interface';
import { IAccountBalanceUseCase } from '../_share/use-case/account-balance.use-case.interface';
import {
  IAccountBalanceInputDTO,
  IAccountBalanceOutputDTO,
} from '../_share/use-case/dto/account-balance.dto';

export class AccountBalanceUseCase implements IAccountBalanceUseCase {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(
    input: IAccountBalanceInputDTO,
  ): Promise<IAccountBalanceOutputDTO> {
    const account = await this.accountRepository.findById(input.accountId);

    return {
      amount: account.value.balance,
    };
  }
}
