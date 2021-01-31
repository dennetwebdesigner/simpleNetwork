'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTERGE,
                primaryKey: true,
                autoincrement: true,
                allowNUll: false
            },
            firstName: {
                type: Sequelize.STRING,
                allowNUll: false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNUll: false
            },
            birthday: {
                type: Sequelize.STRING,
                allowNUll: false
            },
            username: {
                type: Sequelize.STRING,
                allowNUll: false
            },
            email: {
                type: Sequelize.STRING,
                allowNUll: false
            },
            password: {
                type: Sequelize.STRING,
                allowNUll: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNUll: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNUll: false
            },
        });

    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};