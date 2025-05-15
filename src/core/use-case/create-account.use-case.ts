import { ICreateAccountUseCase } from '../_share/use-case/create-account.use-case.interface';
import { Account } from '../entity/account.entity';
import { IAccountRepository } from '../_share/repository/account.repository.interface';
import { IClientRepository } from '../_share/repository/client.repository.interface';
import {
  ICreateAccountInputDTO,
  ICreateAccountOutputDTO,
} from '../_share/use-case/dto/create-account.dto';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(
    input: ICreateAccountInputDTO,
  ): Promise<ICreateAccountOutputDTO> {
    const client = await this.clientRepository.get(input.clientId);
    const account = new Account(client);
    await this.accountRepository.save(account);

    return {
      id: account.value.id,
    };
  }
}
