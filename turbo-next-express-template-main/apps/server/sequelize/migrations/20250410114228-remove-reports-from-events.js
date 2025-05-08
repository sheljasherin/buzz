'use strict';

/**
 * Migration Script: Remove `reports` column from the `events` table.
 * This script modifies the existing `events` table by dropping the `reports` column.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the `reports` column from the `events` table
    await queryInterface.removeColumn('events', 'reports');
  },

  async down(queryInterface, Sequelize) {
    // Add the `reports` column back to the `events` table (rollback)
    await queryInterface.addColumn('events', 'reports', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });
  },
};
