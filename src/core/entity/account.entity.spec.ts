import { Account } from './account.entity';
import { Client, TClientInput } from './client.entity';

describe('[Entity] Account', () => {
  let mockClient: Client;

  beforeEach(() => {
    const payload: TClientInput = {
      name: 'Test Client',
      email: 'test@example.com',
    };

    mockClient = new Client(payload);
  });

  it('should create an account with a valid client', () => {
    const account = new Account(mockClient);

    expect(account).toBeDefined();
    expect(account.value.id).toBeDefined();
    expect(account.value.client).toEqual(mockClient.value);
    expect(account.value.balance).toBe(0);
    expect(account.value.createdAt).toBeInstanceOf(Date);
    expect(account.value.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw if client is null', () => {
    expect(() => new Account(null as unknown as Client)).toThrow(
      'Client is required',
    );
  });

  it('should increase balance on credit', () => {
    const account = new Account(mockClient);
    account.credit(100);

    expect(account.value.balance).toBe(100);
  });

  it('should decrease balance on debit', () => {
    const account = new Account(mockClient);
    account.credit(200);
    account.debit(50);

    expect(account.value.balance).toBe(150);
  });
});
