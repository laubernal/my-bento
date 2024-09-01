import { Module } from '@nestjs/common';
import { MikroOrmDatabaseModule } from '../Persistance/MikroOrmDatabaseModule';
import { Delete30DaysOldLogFilesService } from '../Crons/Delete30DaysOldLogFiles';
import { PostgreSqlDatabaseModule } from '../Persistance/PostgreSql/PostgreSqlDatabaseModule';
import { PostgreSqlDatabaseService } from '../Persistance/PostgreSql/PostgreSqlDatabase';

@Module({
  imports: [
    // MikroOrmDatabaseModule
    PostgreSqlDatabaseModule,
  ],
  exports: [
    // MikroOrmDatabaseModule,
    PostgreSqlDatabaseModule,
  ],
  providers: [Delete30DaysOldLogFilesService, PostgreSqlDatabaseService],
})
export class SharedModule {}
