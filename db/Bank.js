const { Sequelize, sequelize } = require('./db');

const Bank = sequelize.define('bank', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  holder: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  account: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Bank };
