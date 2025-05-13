import { Client } from '../entity/client.entity';

export interface IClientRepository {
  save(client: Client): Promise<void>;
  get(id: string): Promise<Client | null>;
}
