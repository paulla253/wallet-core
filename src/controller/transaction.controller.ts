import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionUseCaseToken } from '../../src/application/dependency-inversion/token/transaction.token';
import { ICreateTransactionUseCase } from '../../src/core/_share/use-case/create-transaction.use-case.interface';
import { CreateTransactionRequestDTO } from './dto/create-transaction.dto';

@ApiTags('transaction')
@Controller('/transaction')
export class TransactionController {
  constructor(
    @Inject(CreateTransactionUseCaseToken)
    private readonly createTransaction: ICreateTransactionUseCase,
  ) {}

  @Post()
  async create(@Body() payload: CreateTransactionRequestDTO): Promise<any> {
    const output = await this.createTransaction.execute(payload);

    return {
      id: output.id,
      accountIdFrom: output.accountIdFrom,
      accountIdTo: output.accountIdTo,
      amount: output.amount,
    };
  }
}
