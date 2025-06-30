export interface IUnitOfWork {
  start(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;
}
