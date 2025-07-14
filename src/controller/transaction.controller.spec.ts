import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { CreateTransactionUseCaseToken } from '../application/dependency-inversion/token/transaction.token';
import { ICreateTransactionUseCase } from '../core/_share/use-case/create-transaction.use-case.interface';
import { CreateTransactionRequestDTO } from './dto/create-transaction.dto';

describe('[Controller] TransactionController', () => {
  let controller: TransactionController;
  let mockCreateTransactionUseCase: jest.Mocked<ICreateTransactionUseCase>;

  beforeEach(async () => {
    mockCreateTransactionUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: CreateTransactionUseCaseToken,
          useValue: mockCreateTransactionUseCase,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should create a transaction and return the response', async () => {
    const payload: CreateTransactionRequestDTO = {
      accountIdFrom: 'acc-001',
      accountIdTo: 'acc-002',
      amount: 100,
    };

    const mockResponse = {
      id: 'txn-123',
      accountIdFrom: 'acc-001',
      accountIdTo: 'acc-002',
      amount: 100,
    };

    mockCreateTransactionUseCase.execute.mockResolvedValue(mockResponse);

    const result = await controller.create(payload);

    expect(mockCreateTransactionUseCase.execute).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockResponse);
  });
});
