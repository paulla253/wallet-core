import { ITransactionUnitOfWork } from '../unit-of-work/transaction-uow.interface';
import { IEventDispatcher, EEvent } from '../event/event-dispatcher.interface';
import { Transaction } from '../entity/transaction.entity';
import { CreateTransactionUseCase } from './create-transaction.use-case';
import { Account } from '../entity/account.entity';
import { Client } from '../entity/client.entity';
import { IAccountRepository } from '../_share/repository/account.repository.interface';
import { ITransactionRepository } from '../_share/repository/transaction.repository.interface';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let mockUow: jest.Mocked<ITransactionUnitOfWork>;
  let mockEventDispatcher: jest.Mocked<IEventDispatcher>;
  let mockAccountRepository: jest.Mocked<IAccountRepository>;
  let mockTransactionRepository: jest.Mocked<ITransactionRepository>;

  const clientFrom = new Client({
    name: 'John Doe',
    email: 'john@example.com',
  });
  const mockAccountFrom = new Account(clientFrom);

  const clientTo = new Client({
    name: 'Jane',
    email: 'jane@example.com',
  });
  const mockAccountTo = new Account(clientTo);

  const input = {
    accountIdFrom: 'acc-from',
    accountIdTo: 'acc-to',
    amount: 10,
  };

  beforeEach(() => {
    mockAccountFrom.credit(150);

    mockEventDispatcher = {
      send: jest.fn(),
    };

    mockAccountRepository = {
      findById: jest.fn(),
      updateBalance: jest.fn(),
      save: jest.fn(),
    };

    mockTransactionRepository = {
      save: jest.fn(),
    };

    mockUow = {
      accountRepository: mockAccountRepository,
      transactionRepository: mockTransactionRepository,
      start: jest.fn(),
      complete: jest.fn(),
      rollback: jest.fn(),
    };

    useCase = new CreateTransactionUseCase(mockUow, mockEventDispatcher);
  });

  it('should throw error if accountFrom is not found', async () => {
    jest.spyOn(mockAccountRepository, 'findById').mockResolvedValueOnce(null);

    await expect(useCase.execute(input)).rejects.toThrow(
      'Conta de destino não encontrada',
    );
  });

  it('should throw error if accountTo is not found', async () => {
    jest
      .spyOn(mockAccountRepository, 'findById')
      .mockResolvedValueOnce(mockAccountFrom)
      .mockResolvedValueOnce(null);

    await expect(useCase.execute(input)).rejects.toThrow(
      'Conta de origem não encontrada',
    );
  });

  it('should create a transaction, persist and dispatch events', async () => {
    jest
      .spyOn(mockAccountRepository, 'findById')
      .mockResolvedValueOnce(mockAccountFrom)
      .mockResolvedValueOnce(mockAccountTo);

    const result = await useCase.execute(input);

    expect(mockUow.start).toHaveBeenCalled();
    expect(mockUow.accountRepository.updateBalance).toHaveBeenCalledWith(
      mockAccountFrom,
    );
    expect(mockUow.accountRepository.updateBalance).toHaveBeenCalledWith(
      mockAccountTo,
    );
    expect(mockUow.transactionRepository.save).toHaveBeenCalled();
    expect(mockUow.complete).toHaveBeenCalled();

    expect(mockEventDispatcher.send).toHaveBeenCalledWith({
      event: EEvent.UPDATE_BALANCE,
      payload: {
        accountIdFrom: input.accountIdFrom,
        accountIdTo: input.accountIdTo,
        balanceAccountIdFrom: mockAccountFrom.value,
        balanceAccountIdTo: mockAccountTo.value,
      },
    });

    expect(mockEventDispatcher.send).toHaveBeenCalledWith({
      event: EEvent.TRANSACTION,
      payload: expect.any(Transaction),
    });

    expect(result).toEqual({
      id: expect.any(String),
      accountIdFrom: input.accountIdFrom,
      accountIdTo: input.accountIdTo,
      amount: input.amount,
    });
  });

  it('should rollback on error and rethrow', async () => {
    jest
      .spyOn(mockAccountRepository, 'findById')
      .mockResolvedValueOnce(mockAccountFrom)
      .mockResolvedValueOnce(mockAccountTo);
    jest
      .spyOn(mockTransactionRepository, 'save')
      .mockRejectedValueOnce(new Error('DB error'));

    await expect(useCase.execute(input)).rejects.toThrow('DB error');

    expect(mockUow.rollback).toHaveBeenCalled();
    expect(mockUow.complete).not.toHaveBeenCalled();
  });
});
