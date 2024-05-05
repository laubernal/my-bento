import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*EntityMikroOrm.js'],
  entitiesTs: ['src/**/*EntityMikroOrm.ts'],
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
});
