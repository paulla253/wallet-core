import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transaction')
@Controller('/transaction')
export class TransactionController {
  constructor() {}

  @Post()
  async save(): Promise<any> {
    //await this.createClientUseCase.execute();

    return 'ok';
  }
}
