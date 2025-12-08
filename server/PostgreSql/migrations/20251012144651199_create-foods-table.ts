import {ColumnDefinitions, MigrationBuilder} from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('foods', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true
        },
        name: {
            type: 'varchar(255)',
            notNull: true
        },
        category: {
            type: 'varchar(255)',
            notNull: true
        },
        created_at: {
            type: 'timestamptz',
            notNull: true
        },
        updated_at: {
            type: 'timestamptz',
            notNull: true
        }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('foods', {ifExists: true});
}
