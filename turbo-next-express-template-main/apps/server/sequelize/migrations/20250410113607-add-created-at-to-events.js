'use strict';

/**
 * Migration Script: Adds `created_at` and `updated_at` columns to the `events` table.
 * This script modifies the existing `events` table to include timestamps for record creation and updates.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add `created_at` column
    await queryInterface.addColumn('events', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    // Add `updated_at` column
    await queryInterface.addColumn('events', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove `created_at` column
    await queryInterface.removeColumn('events', 'created_at');

    // Remove `updated_at` column
    await queryInterface.removeColumn('events', 'updated_at');
  },
};
