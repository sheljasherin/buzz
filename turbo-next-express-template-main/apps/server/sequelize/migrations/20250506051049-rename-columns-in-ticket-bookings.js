module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ticket_bookings', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('ticket_bookings', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ticket_bookings', 'created_at', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.changeColumn('ticket_bookings', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
  },
};
