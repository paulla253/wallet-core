import {
  ICreateTransactionInputDTO,
  ICreateTransactionOutputDTO,
} from './dto/create-transaction.dto';
import IUseCase from './use-case.interface';

export interface ICreateTransactionUseCase
  extends IUseCase<ICreateTransactionInputDTO, ICreateTransactionOutputDTO> {}
