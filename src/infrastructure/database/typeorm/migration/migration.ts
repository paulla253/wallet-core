import { DataSource } from 'typeorm';
import ClientTableQuery from '../../query/client.query';
import AccountTableQuery from '../../query/account.query';
import TransactionTableQuery from '../../query/transaction.query ';
import DatabaseConfig from '../../../../infrastructure/config/database.config';

async function initialize(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: 'mysql',
    host: DatabaseConfig.MYSQL_HOST,
    database: DatabaseConfig.MYSQL_DATABASE,
    username: DatabaseConfig.MYSQL_USER,
    password: DatabaseConfig.MYSQL_PASSWORD,
    port: 3306,
  });
  await dataSource.initialize();

  return dataSource;
}

async function createMigration(dataSource: DataSource) {
  await dataSource.query(ClientTableQuery.CREATE);
  await dataSource.query(AccountTableQuery.CREATE);
  await dataSource.query(TransactionTableQuery.CREATE);
}

//async function createSeeds(dataSource: DataSource) {}

async function execute() {
  console.log('Starting database..');
  const dataSource = await initialize();
  console.log('Sync entities into database..');
  await dataSource.synchronize(true);
  await createMigration(dataSource);
  console.log('Creating seeds into database..');
  // await createSeeds(dataSource);
  console.log('Closing connection database..');
  await dataSource.destroy();
}

execute();
