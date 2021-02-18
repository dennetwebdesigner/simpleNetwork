'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('observers', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                AllowNUll: false,
            },
            from: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false
            },
            for: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        });

    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('observers');
    }
};