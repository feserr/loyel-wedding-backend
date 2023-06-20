const { Sequelize, sequelize } = require('./db');

const Key = sequelize.define('key', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Key };
