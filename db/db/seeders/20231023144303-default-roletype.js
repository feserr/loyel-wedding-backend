const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('RoleTypes', [
      {
        id: uuidv4(),
        type: process.env.ADMIN_TYPE,
        color: process.env.ADMIN_COLOR,
        isAdmin: true,
        maxSongs: process.env.ADMIN_MAX_SONGS,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Banks', null, {});
  },
};
