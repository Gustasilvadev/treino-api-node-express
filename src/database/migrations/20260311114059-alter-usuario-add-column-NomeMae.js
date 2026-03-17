'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'nomeMaeGustavoMartins', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Nao informado"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'nomeMaeGustavoMartins');
  }
};
