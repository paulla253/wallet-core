import { IClientRepository } from '../_share/repository/client.repository.interface';
import { CreateClientUseCase } from './create-client.use-case';

describe('[Use Case] CreateClientUseCase', () => {
  let createClientUseCase: CreateClientUseCase;
  let mockClientRepository: jest.Mocked<IClientRepository>;

  beforeEach(() => {
    mockClientRepository = {
      save: jest.fn(),
    } as any;

    createClientUseCase = new CreateClientUseCase(mockClientRepository);
  });

  it('should create a new client and return its data', async () => {
    const input = {
      name: 'Jane Doe',
      email: 'jane@example.com',
    };

    const result = await createClientUseCase.execute(input);

    expect(mockClientRepository.save).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
