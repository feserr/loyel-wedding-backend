/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoleTypes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'black',
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      maxSongs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: process.env.MAX_SONGS,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('RoleTypes');
  },
};
