const { Sequelize, sequelize } = require('./db');

const TempPassword = sequelize.define(
  'tempPassword',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
);

module.exports = { TempPassword };
