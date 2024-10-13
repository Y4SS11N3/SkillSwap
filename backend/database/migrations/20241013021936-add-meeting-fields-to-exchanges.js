'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Exchanges', 'meetingRequestStatus', {
      type: Sequelize.ENUM('none', 'requested', 'accepted'),
      allowNull: false,
      defaultValue: 'none'
    });

    await queryInterface.addColumn('Exchanges', 'meetingLink', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Exchanges', 'meetingRequestStatus');
    await queryInterface.removeColumn('Exchanges', 'meetingLink');
  }
};