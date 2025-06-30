import { DataSource } from 'typeorm';
import ClientTable from './table/client.table';
import AccountTable from './table/account.table';
import TransactionTable from './table/transaction.table';
import DatabaseConfig from '../../../../infrastructure/config/database.config';

async function initialize(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: 'mysql',
    host: DatabaseConfig.MYSQL_HOST,
    database: DatabaseConfig.MYSQL_DATABASE,
    username: DatabaseConfig.MYSQL_USER,
    password: DatabaseConfig.MYSQL_PASSWORD,
    port: DatabaseConfig.MYSQL_PORT,
  });
  await dataSource.initialize();

  return dataSource;
}

async function createMigration(dataSource: DataSource) {
  await dataSource.query(ClientTable.CREATE);
  await dataSource.query(AccountTable.CREATE);
  await dataSource.query(TransactionTable.CREATE);
}

async function createSeeds(dataSource: DataSource) {
  await dataSource.query(ClientTable.INSERT);
  await dataSource.query(AccountTable.INSERT);
}

async function execute() {
  console.log('Starting database..');
  const dataSource = await initialize();
  console.log('Sync entities into database..');
  await dataSource.synchronize(true);
  await createMigration(dataSource);
  console.log('Creating seeds into database..');
  await createSeeds(dataSource);
  console.log('Closing connection database..');
  await dataSource.destroy();
}

execute();
