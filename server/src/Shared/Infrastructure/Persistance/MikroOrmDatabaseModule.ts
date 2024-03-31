import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FoodEntity } from './Model/FoodEntityMikroOrm';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MikroOrmModuleOptions> => ({
        entities: [FoodEntity],
        dbName: configService.get<string>('MIKRO_ORM_DB_NAME'),
        user: configService.get<string>('MIKRO_ORM_USER'),
        password: configService.get<string>('MIKRO_ORM_PASSWORD'),
        driver: PostgreSqlDriver,
        extensions: [Migrator],
        migrations: {
          tableName: 'mikro_orm_migrations',
          path: './dist/MikroORM/migrations',
          pathTs: './src/MikroORM/migrations',
          glob: '!(*.d).{js,ts}',
          transactional: true,
          disableForeignKeys: true,
          allOrNothing: true,
          dropTables: true,
          safe: false,
          snapshot: true,
          emit: 'ts',
          generator: TSMigrationGenerator,
        },
      }),
    }),
  ],
})
export class MikroOrmDatabaseModule {}
