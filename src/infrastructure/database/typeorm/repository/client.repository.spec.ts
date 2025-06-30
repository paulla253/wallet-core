import { DataSource } from 'typeorm';
import { ClientRepository } from './client.repository';
import { Client } from '../../../../core/entity/client.entity';
import ClientTable from '../migration/table/client.table';

describe('[Repository] ClientRepository', () => {
  let dataSource: DataSource;
  let clientRepository: ClientRepository;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [],
    });

    await dataSource.initialize();

    await dataSource.query(ClientTable.CREATE);

    const query = dataSource.createQueryRunner();

    clientRepository = new ClientRepository(query);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should save and retrieve a client', async () => {
    const client = new Client({ name: 'Alice', email: 'alice@example.com' });

    await clientRepository.save(client);

    const found = await clientRepository.get(client.value.id);

    expect(found).not.toBeNull();
    expect(found?.value.name).toBe('Alice');
    expect(found?.value.email).toBe('alice@example.com');
  });

  it('should return null for non-existent client', async () => {
    const result = await clientRepository.get('non-existent-id');
    expect(result).toBeNull();
  });
});
