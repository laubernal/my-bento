import { Module } from '@nestjs/common';
import { PostgreSqlDatabaseService } from './PostgreSqlDatabase';

@Module({
  providers: [PostgreSqlDatabaseService],
  exports: [PostgreSqlDatabaseService],
})
export class PostgreSqlDatabaseModule {}
