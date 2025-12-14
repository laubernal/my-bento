exports.up = (pgm) => {
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

exports.down = (pgm) => {
    pgm.dropTable('foods', {ifExists: true});
}
