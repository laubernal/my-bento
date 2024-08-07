import { Module } from '@nestjs/common';
import { MikroOrmDatabaseModule } from '../Persistance/MikroOrmDatabaseModule';
import { Delete30DaysOldLogFilesService } from '../Crons/Delete30DaysOldLogFiles';

@Module({
  imports: [MikroOrmDatabaseModule],
  exports: [MikroOrmDatabaseModule],
  providers: [Delete30DaysOldLogFilesService],
})
export class SharedModule {}
