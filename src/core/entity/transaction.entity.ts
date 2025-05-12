import { Id } from '../_share/value-object/id.value-object';
import { Account, TAccountOutput } from './account.entity';

export type TTransactionInput = {
  accountFrom: Account;
  accountTo: Account;
  amount: number;
};

export type TTransactionOutput = {
  id: string;
  accountFrom: TAccountOutput;
  accountFromId: string;
  accountTo: TAccountOutput;
  accountToId: string;
  amount: number;
  createdAt: Date;
};

export class Transaction {
  private id: Id;
  private accountFrom: Account;
  private accountFromId: string;
  private accountTo: Account;
  private accountToId: string;
  private amount: number;
  private createdAt: Date;

  constructor(payload: TTransactionInput) {
    this.id = new Id();
    this.accountFrom = payload.accountFrom;
    this.accountTo = payload.accountTo;
    this.accountFromId = payload.accountFrom.value.id;
    this.accountToId = payload.accountTo.value.id;
    this.amount = payload.amount;
    this.createdAt = new Date();

    const error = this.validate();
    if (error) {
      throw new Error(error);
    }

    this.commit();
  }

  private commit(): void {
    this.accountFrom.debit(this.amount);
    this.accountTo.credit(this.amount);
  }

  private validate(): string | null {
    if (this.amount <= 0) {
      return 'amount must be greater than zero';
    }
    if (this.accountFrom.value.balance < this.amount) {
      return 'insufficient funds';
    }
    return null;
  }

  get value(): TTransactionOutput {
    return {
      id: this.id.value,
      accountFrom: this.accountFrom.value,
      accountFromId: this.accountFromId,
      accountTo: this.accountTo.value,
      accountToId: this.accountToId,
      amount: this.amount,
      createdAt: this.createdAt,
    };
  }
}
