exports.up = (pgm) => {
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

exports.down = (pgm) => {
    pgm.dropTable('menus_meals', {ifExists: true});
    pgm.dropTable('menus', {ifExists: true});
}
