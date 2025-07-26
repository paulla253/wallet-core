export enum EEvent {
  TRANSACTION = 'transaction',
  UPDATE_BALANCE = 'balance',
}

export type TOutputEvent = {
  event: EEvent;
  payload: any;
};

export interface IEventDispatcher {
  send(output: TOutputEvent): Promise<void>;
}
