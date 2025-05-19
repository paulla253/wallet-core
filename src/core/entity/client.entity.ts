import { Id } from '../_share/value-object/id.value-object';
import { Account } from './account.entity';

export type TClientInput = {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TClienOutput = {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
  createdAt: Date;
  updatedAt: Date;
};

export class Client {
  private id: Id;
  private name: string;
  private email: string;
  private accounts: Account[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(payload: TClientInput) {
    this.id = new Id(payload.id);
    this.name = payload.name;
    this.email = payload.email;
    this.accounts = [];
    this.createdAt = payload.createdAt || new Date();
    this.updatedAt = payload.createdAt || new Date();

    const error = this.validate();
    if (error) {
      throw new Error(error);
    }
  }

  private validate(): string | null {
    if (!this.name) {
      return 'name is required';
    }
    if (!this.email) {
      return 'email is required';
    }
    return null;
  }

  public update(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();

    const error = this.validate();
    if (error) {
      throw new Error(error);
    }
  }

  public addAccount(account: Account): void {
    if (account.value.client.id !== this.id.value) {
      throw new Error('account does not belong to client');
    }
    this.accounts.push(account);
  }

  get value(): TClienOutput {
    return {
      id: this.id.value,
      name: this.name,
      email: this.email,
      accounts: this.accounts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
