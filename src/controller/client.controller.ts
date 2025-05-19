import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateClientUseCaseToken } from 'src/application/dependency-inversion/token/client.token';
import { ICreateClientUseCase } from 'src/core/_share/use-case/create-client.use-case.interface';
import { CreateClientRequestDTO } from './dto/create-client.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('client')
@Controller('/client')
export class ClientController {
  constructor(
    @Inject(CreateClientUseCaseToken)
    private readonly createClientUseCase: ICreateClientUseCase,
  ) {}

  @Post()
  async create(@Body() payload: CreateClientRequestDTO): Promise<any> {
    const output = await this.createClientUseCase.execute(payload);

    console.log(output);

    return 'ok';
  }
}
