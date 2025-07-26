import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import {
  AccountBalanceUseCaseToken,
  CreateAccountUseCaseToken,
} from '../application/dependency-inversion/token/account.token';
import { ICreateAccountUseCase } from '../core/_share/use-case/create-account.use-case.interface';
import { CreateAccountRequestDTO } from './dto/create-account.dto';
import { IAccountBalanceUseCase } from 'src/core/_share/use-case/account-balance.use-case.interface';

describe('[Controller] AccountController', () => {
  let controller: AccountController;
  let mockCreateAccountUseCase: jest.Mocked<ICreateAccountUseCase>;
  let mockAccountBalanceUseCase: jest.Mocked<IAccountBalanceUseCase>;

  beforeEach(async () => {
    mockCreateAccountUseCase = {
      execute: jest.fn(),
    };
    mockAccountBalanceUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: CreateAccountUseCaseToken,
          useValue: mockCreateAccountUseCase,
        },
        {
          provide: AccountBalanceUseCaseToken,
          useValue: mockAccountBalanceUseCase,
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should create an account and return the id', async () => {
    const payload: CreateAccountRequestDTO = {
      clientId: 'client-123',
    };

    const mockResponse = {
      id: 'account-456',
    };

    mockCreateAccountUseCase.execute.mockResolvedValue(mockResponse);

    const result = await controller.create(payload);

    expect(mockCreateAccountUseCase.execute).toHaveBeenCalledWith(payload);
    expect(result).toEqual({ id: 'account-456' });
  });

  it('should get value balance', async () => {
    const accountId = 'any_account_id';

    const mockResponse = {
      amount: 500,
    };

    mockAccountBalanceUseCase.execute.mockResolvedValue(mockResponse);

    const result = await controller.balance(accountId);

    expect(mockAccountBalanceUseCase.execute).toHaveBeenCalledWith({
      accountId,
    });
    expect(result).toEqual(mockResponse);
  });
});
