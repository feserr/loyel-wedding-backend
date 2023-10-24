const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoleType extends Model {
    static associate(models) {
      RoleType.hasMany(models.Role, { foreignKey: 'roleTypeId', as: 'Role' });
    }
  }
  RoleType.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'white',
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      maxSongs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: process.env.MAX_SONGS,
      },
    },
    {
      sequelize,
      modelName: 'RoleType',
    },
  );
  return RoleType;
};
