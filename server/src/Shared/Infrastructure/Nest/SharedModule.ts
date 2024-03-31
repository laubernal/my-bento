import { Module } from '@nestjs/common';
import { MikroOrmDatabaseModule } from '../Persistance/MikroOrmDatabaseModule';

@Module({
  imports: [MikroOrmDatabaseModule],
  exports: [MikroOrmDatabaseModule],
})
export class SharedModule {}
