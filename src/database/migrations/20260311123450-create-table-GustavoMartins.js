'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('times_brasileiros', {
      // É boa prática ter um ID autoincrement
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      qtdTitulos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      anoUltimoTitulo: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      // Timestamps (recomendado pelo Sequelize)
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // Para desfazer, basta excluir a tabela inteira
    await queryInterface.dropTable('times_brasileiros');
  }
}