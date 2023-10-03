const { Sequelize, sequelize } = require('./db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  spotifyUserId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { User };
