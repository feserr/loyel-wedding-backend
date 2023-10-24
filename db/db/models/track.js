const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      Track.hasOne(models.User, { foreignKey: 'userId', as: 'User' });
      Track.hasMany(models.Like, { foreignKey: 'trackId', as: 'Like' });
    }
  }
  Track.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      spotifyTrackId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uri: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      album: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Track',
    },
  );
  return Track;
};
