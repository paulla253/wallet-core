import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { CreateAccountUseCaseToken } from '../application/dependency-inversion/token/account.token';
import { ICreateAccountUseCase } from '../core/_share/use-case/create-account.use-case.interface';
import { CreateAccountRequestDTO } from './dto/create-account.dto';

describe('[Controller] AccountController', () => {
  let controller: AccountController;
  let mockCreateAccountUseCase: jest.Mocked<ICreateAccountUseCase>;

  beforeEach(async () => {
    mockCreateAccountUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: CreateAccountUseCaseToken,
          useValue: mockCreateAccountUseCase,
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
});
