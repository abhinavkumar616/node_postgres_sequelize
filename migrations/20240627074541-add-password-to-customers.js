'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new `password` column
    await queryInterface.addColumn('customers', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the `password` column
    await queryInterface.removeColumn('customers', 'password');
  }
};
