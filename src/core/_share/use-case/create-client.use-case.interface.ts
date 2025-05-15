import {
  ICreateClientInputDTO,
  ICreateClientOutputDTO,
} from './dto/create-client.dto';
import IUseCase from './use-case.interface';

export interface ICreateClientUseCase
  extends IUseCase<ICreateClientInputDTO, ICreateClientOutputDTO> {}
