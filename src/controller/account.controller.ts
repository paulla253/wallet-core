import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountUseCaseToken } from '../application/dependency-inversion/token/account.token';
import { ICreateAccountUseCase } from '../core/_share/use-case/create-account.use-case.interface';
import { CreateAccountRequestDTO } from './dto/create-account.dto';

export type TAccountResponse = {
  id: string;
};

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(
    @Inject(CreateAccountUseCaseToken)
    private readonly createAccountUseCase: ICreateAccountUseCase,
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
}
