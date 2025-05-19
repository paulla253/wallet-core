import { Module } from '@nestjs/common';
import { SQLLiteDataSourceToken } from 'src/application/dependency-inversion/token/database.token';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    {
      provide: SQLLiteDataSourceToken,
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'sqlite',
          database: 'database.sqlite',
          synchronize: true,
        });
        await dataSource.initialize();
        return dataSource;
      },
    },
  ],
  exports: [SQLLiteDataSourceToken],
})
export class DatabaseModule {}
