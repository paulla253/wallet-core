export interface ICreateTransactionInputDTO {
  accountIdFrom: string;
  accountIdTo: string;
  amount: number;
}
export interface ICreateTransactionOutputDTO {
  id: string;
  accountIdFrom: string;
  accountIdTo: string;
  amount: number;
}
