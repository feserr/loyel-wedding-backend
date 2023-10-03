const { Sequelize, sequelize } = require('./db');

const Track = sequelize.define('track', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  spotifyTrackId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  uri: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  album: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Track };
