import {
  IAccountBalanceInputDTO,
  IAccountBalanceOutputDTO,
} from './dto/account-balance.dto';
import IUseCase from './use-case.interface';

export interface IAccountBalanceUseCase
  extends IUseCase<IAccountBalanceInputDTO, IAccountBalanceOutputDTO> {}
