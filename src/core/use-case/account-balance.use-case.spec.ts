import { AccountBalanceUseCase } from './account-balance.use-case';
import { IAccountRepository } from '../_share/repository/account.repository.interface';
import { Client, TClientInput } from '../entity/client.entity';
import { Account } from '../entity/account.entity';

describe('AccountBalanceUseCase', () => {
  let accountRepository: jest.Mocked<IAccountRepository>;
  let useCase: AccountBalanceUseCase;

  const mockInput = { accountId: 'account-123' };

  beforeEach(() => {
    accountRepository = {
      findById: jest.fn(),
    } as any;

    useCase = new AccountBalanceUseCase(accountRepository);
  });

  it('should return the account balance', async () => {
    const payload: TClientInput = {
      name: 'Test Client',
      email: 'test@example.com',
    };

    const mockClient = new Client(payload);
    const mockAccount = new Account(mockClient);
    mockAccount.credit(500);

    jest.spyOn(accountRepository, 'findById').mockResolvedValue(mockAccount);

    const result = await useCase.execute(mockInput);

    expect(accountRepository.findById).toHaveBeenCalledWith(
      mockInput.accountId,
    );
    expect(result).toEqual({ amount: 500 });
  });

  it('should throw error if account not found', async () => {
    jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

    await expect(useCase.execute(mockInput)).rejects.toThrow();
  });
});
