'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop primary key from email if it exists
    await queryInterface.removeConstraint('customers', 'PRIMARY');

    // Add the new `id` column as the primary key
    await queryInterface.addColumn('customers', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    });

    // Ensure email is unique
    await queryInterface.changeColumn('customers', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
    });

    
  },

  down: async (queryInterface, Sequelize) => {

     

    // Remove the `id` column
    await queryInterface.removeColumn('customers', 'id');

    // Revert email to primary key
    await queryInterface.changeColumn('customers', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false, // Revert to previous state
      primaryKey: true
    });
  }
};
