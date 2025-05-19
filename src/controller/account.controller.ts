import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountUseCaseToken } from 'src/application/dependency-inversion/token/account.token';
import { ICreateAccountUseCase } from 'src/core/_share/use-case/create-account.use-case.interface';
import { CreateAccountRequestDTO } from './dto/create-account.dto';

@ApiTags('account')
@Controller('/account')
export class AccountController {
  constructor(
    @Inject(CreateAccountUseCaseToken)
    private readonly createAccountUseCase: ICreateAccountUseCase,
  ) {}

  @Post()
  async create(@Body() payload: CreateAccountRequestDTO): Promise<any> {
    await this.createAccountUseCase.execute(payload);

    return 'ok';
  }
}
