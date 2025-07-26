import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AccountBalanceUseCaseToken,
  CreateAccountUseCaseToken,
} from '../application/dependency-inversion/token/account.token';
import { ICreateAccountUseCase } from '../core/_share/use-case/create-account.use-case.interface';
import { CreateAccountRequestDTO } from './dto/create-account.dto';
import { IAccountBalanceUseCase } from 'src/core/_share/use-case/account-balance.use-case.interface';

export type TAccountResponse = {
  id: string;
};

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(
    @Inject(CreateAccountUseCaseToken)
    private readonly createAccountUseCase: ICreateAccountUseCase,
    @Inject(AccountBalanceUseCaseToken)
    private readonly accountBalanceUseCase: IAccountBalanceUseCase,
  ) {}

  @Post()
  async create(
    @Body() payload: CreateAccountRequestDTO,
  ): Promise<TAccountResponse> {
    const output = await this.createAccountUseCase.execute(payload);

    return {
      id: output.id,
    };
  }

  @Get('balance/:account_id')
  async balance(@Param('account_id') account_id: string): Promise<any> {
    const output = await this.accountBalanceUseCase.execute({
      accountId: account_id,
    });

    return output;
  }
}
