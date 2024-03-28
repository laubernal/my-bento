import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MikroOrmModuleOptions> => ({
        entities: [],
        dbName: configService.get<string>('POSTGRES_DB'),
        user: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
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
