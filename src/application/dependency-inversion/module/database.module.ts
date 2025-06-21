import { Module } from '@nestjs/common';
import { MYSQLDataSourceToken } from 'src/application/dependency-inversion/token/database.token';
import DatabaseConfig from 'src/infrastructure/config/database.config';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    {
      provide: MYSQLDataSourceToken,
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: DatabaseConfig.MYSQL_HOST,
          database: DatabaseConfig.MYSQL_DATABASE,
          username: DatabaseConfig.MYSQL_USER,
          password: DatabaseConfig.MYSQL_PASSWORD,
          port: DatabaseConfig.MYSQL_PORT,
        });

        await dataSource.initialize();

        return dataSource.createQueryRunner();
      },
    },
  ],
  exports: [MYSQLDataSourceToken],
})
export class DatabaseModule {}
