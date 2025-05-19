import { v4 as uuidv4 } from 'uuid';

export class Id {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id || uuidv4();
  }

  get value(): string {
    return this._value;
  }
}
