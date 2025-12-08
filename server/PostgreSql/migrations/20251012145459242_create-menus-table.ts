import {ColumnDefinitions, MigrationBuilder} from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('menus', {
        id: {
            type: 'uuid',
            primaryKey: true
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
    
    pgm.createTable('menus_meals', {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        menu_id: {
            type: 'uuid',
            notNull: true,
            references: 'menus',
            onDelete: 'CASCADE'
        },
        date: {
            type: 'date',
            notNull: true
        },
        meal_id: {
            type: 'uuid',
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
    
    pgm.createIndex('menus_meals', 'menu_id');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('menus_meals', {ifExists: true});
    pgm.dropTable('menus', {ifExists: true});
}
