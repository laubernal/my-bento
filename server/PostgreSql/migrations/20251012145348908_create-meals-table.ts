import {ColumnDefinitions, MigrationBuilder} from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('meals', {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        name: {
            type: 'varchar(255)',
            notNull: true
        },
        type: {
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

    pgm.createTable('meal_foods', {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        meal_id: {
            type: 'uuid',
            notNull: true,
            references: 'meals',
            onDelete: 'CASCADE'
        },
        food_id: {
            type: 'uuid',
            notNull: true,
            references: 'foods',
            onDelete: 'CASCADE'
        },
        amount: {
            type: 'integer',
            notNull: true
        },
        unit: {
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
    pgm.dropTable('meal_foods', {ifExists: true, cascade: true});
    pgm.dropTable('meals', {ifExists: true, cascade: true});
}
