import { Client } from '../entity/client.entity';
import { IAccountRepository } from '../_share/repository/account.repository.interface';
import { IClientRepository } from '../_share/repository/client.repository.interface';
import { CreateAccountUseCase } from './create-account.use-case';

describe('[UseCase] CreateAccountUseCase', () => {
  let createAccountUseCase: CreateAccountUseCase;
  let mockAccountRepository: jest.Mocked<IAccountRepository>;
  let mockClientRepository: jest.Mocked<IClientRepository>;
  const mockClient = new Client({
    name: 'John Doe',
    email: 'john@example.com',
  });

  beforeEach(() => {
    mockAccountRepository = {
      save: jest.fn(),
    } as any;

    mockClientRepository = {
      get: jest.fn().mockResolvedValue(mockClient),
    } as any;

    createAccountUseCase = new CreateAccountUseCase(
      mockAccountRepository,
      mockClientRepository,
    );
  });

  it('should create a new account and return its ID', async () => {
    const input = { clientId: mockClient.value.id };

    const result = await createAccountUseCase.execute(input);

    expect(mockClientRepository.get).toHaveBeenCalledWith(mockClient.value.id);
    expect(mockAccountRepository.save).toHaveBeenCalled();
    expect(result).not.toBeNull();
  });
});
