import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FoodEntity } from './Model/FoodEntityMikroOrm';
import { MealEntity } from './Model/MealEntityMikroOrm';
import { MealFoodEntity } from './Model/MealFoodEntityMikroOrm';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MikroOrmModuleOptions> => {
        return {
          entities: [FoodEntity, MealEntity, MealFoodEntity],
          dbName: configService.get<string>('DB_NAME'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          driver: PostgreSqlDriver,
          extensions: [Migrator],
          migrations: {
            tableName: 'mikro_orm_migrations',
            path: './dist/src/MikroORM/migrations',
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
          debug: true,
        };
      },
    }),
  ],
})
export class MikroOrmDatabaseModule {}
