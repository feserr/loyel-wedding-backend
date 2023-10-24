const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Banks', [
      {
        id: uuidv4(),
        holder: process.env.HOLDER_1,
        account: process.env.ACCOUNT_1,
        country: process.env.COUNTRY_1,
      },
      {
        id: uuidv4(),
        holder: process.env.HOLDER_2,
        account: process.env.ACCOUNT_2,
        country: process.env.COUNTRY_2,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Banks', null, {});
  },
};
