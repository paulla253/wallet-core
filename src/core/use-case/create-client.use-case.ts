import { Client } from '../entity/client.entity';
import { IClientRepository } from '../_share/repository/client.repository.interface';
import {
  ICreateClientInputDTO,
  ICreateClientOutputDTO,
} from '../_share/use-case/dto/create-client.dto';

export class CreateClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(input: ICreateClientInputDTO): Promise<ICreateClientOutputDTO> {
    const client = new Client({ name: input.name, email: input.email });
    await this.clientRepository.save(client);

    const output: ICreateClientOutputDTO = {
      id: client.value.id,
      name: client.value.name,
      email: client.value.email,
      createdAt: client.value.createdAt,
      updatedAt: client.value.updatedAt,
    };

    return output;
  }
}
