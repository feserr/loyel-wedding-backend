const { Sequelize, sequelize } = require('./db');

const Like = sequelize.define('Like', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = { Like };
