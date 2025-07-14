import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { CreateClientUseCaseToken } from '../application/dependency-inversion/token/client.token';
import { CreateClientRequestDTO } from './dto/create-client.dto';
import { ICreateClientUseCase } from '../core/_share/use-case/create-client.use-case.interface';

describe('[Controller] ClientController', () => {
  let controller: ClientController;
  let mockCreateClientUseCase: jest.Mocked<ICreateClientUseCase>;

  beforeEach(async () => {
    mockCreateClientUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: CreateClientUseCaseToken,
          useValue: mockCreateClientUseCase,
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should create a client and return the response', async () => {
    const payload: CreateClientRequestDTO = {
      name: 'Teste',
      email: 'teste@example.com',
    };

    const mockResponse = {
      id: '123',
      name: payload.name,
      email: payload.email,
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    };

    mockCreateClientUseCase.execute.mockResolvedValue(mockResponse);

    const result = await controller.create(payload);

    expect(mockCreateClientUseCase.execute).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockResponse);
  });
});
