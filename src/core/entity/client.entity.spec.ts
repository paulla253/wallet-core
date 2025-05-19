import { Client, TClientInput } from './client.entity';
import { Account } from './account.entity';

describe('[Entity] Client', () => {
  let payload: TClientInput;

  beforeEach(() => {
    payload = {
      name: 'John Doe',
      email: 'john@example.com',
    };
  });

  it('should create a client with valid name and email', () => {
    const client = new Client(payload);

    expect(client).toBeDefined();
    expect(client.value.id).toBeDefined();
    expect(client.value.name).toBe(payload.name);
    expect(client.value.email).toBe(payload.email);
    expect(client.value.accounts).toEqual([]);
    expect(client.value.createdAt).toBeInstanceOf(Date);
    expect(client.value.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a client with valid id, name, email, updatedAt and createdAt', () => {
    const id = 'any_id';
    const createdAt = new Date(2015, 0, 1);
    const updatedAt = new Date(2015, 0, 1);
    const client = new Client({ ...payload, id, updatedAt, createdAt });

    expect(client.value.id).toBe(id);
    expect(client.value.name).toBe(payload.name);
    expect(client.value.email).toBe(payload.email);
    expect(client.value.updatedAt).toEqual(updatedAt);
    expect(client.value.createdAt).toEqual(createdAt);
  });

  it('should throw if name is missing', () => {
    payload.name = '';
    expect(() => new Client(payload)).toThrow('name is required');
  });

  it('should throw if email is missing', () => {
    payload.email = '';
    expect(() => new Client(payload)).toThrow('email is required');
  });

  it('should update client details correctly', () => {
    const client = new Client(payload);

    client.update('Jane Doe', 'jane@example.com');

    expect(client.value.name).toBe('Jane Doe');
    expect(client.value.email).toBe('jane@example.com');
  });

  it('should throw when updating with invalid name', () => {
    const client = new Client(payload);
    expect(() => client.update('', 'jane@example.com')).toThrow(
      'name is required',
    );
  });

  it('should throw when updating with invalid email', () => {
    const client = new Client(payload);
    expect(() => client.update('Jane Doe', '')).toThrow('email is required');
  });

  it('should add a valid account to the client', () => {
    const client = new Client(payload);
    const account = new Account(client);

    client.addAccount(account);

    expect(client.value.accounts.length).toBe(1);
    expect(client.value.accounts[0]).toBe(account);
  });

  it('should throw when adding account with different client ID', () => {
    const client1 = new Client({
      name: 'Client One',
      email: 'one@example.com',
    });
    const client2 = new Client({
      name: 'Client Two',
      email: 'two@example.com',
    });
    const account = new Account(client2);

    expect(() => client1.addAccount(account)).toThrow(
      'account does not belong to client',
    );
  });
});
