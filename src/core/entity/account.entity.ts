import { Id } from '../_share/value-object/id.value-object';
import { Client, TClienOutput } from './client.entity';

export type TAccountOutput = {
  id: string;
  client: TClienOutput;
  clientId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Account {
  private id: Id;
  private client: Client;
  private clientId: string;
  private balance: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(client: Client, id?: string) {
    if (!client) {
      throw new Error('Client is required');
    }

    this.id = new Id(id);
    this.client = client;
    this.clientId = client.value.id;
    this.balance = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public credit(amount: number): void {
    this.balance += amount;
    this.updatedAt = new Date();
  }

  public debit(amount: number): void {
    this.balance -= amount;
    this.updatedAt = new Date();
  }

  get value(): TAccountOutput {
    return {
      id: this.id.value,
      client: this.client.value,
      clientId: this.clientId,
      balance: this.balance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
