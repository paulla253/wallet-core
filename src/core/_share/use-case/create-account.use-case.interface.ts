import {
  ICreateAccountInputDTO,
  ICreateAccountOutputDTO,
} from './dto/create-account.dto';
import IUseCase from './use-case.interface';

export interface ICreateAccountUseCase
  extends IUseCase<ICreateAccountInputDTO, ICreateAccountOutputDTO> {}
