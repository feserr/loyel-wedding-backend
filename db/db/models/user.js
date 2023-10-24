const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Role, { foreignKey: 'userId', as: 'Role' });
      User.hasOne(models.TempPassword, { foreignKey: 'userId', as: 'TempPassword' });
      User.hasMany(models.Track, { foreignKey: 'userId', as: 'Track' });
      User.hasMany(models.Like, { foreignKey: 'userId', as: 'Like' });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        signin: {},
      },
    },
  );
  return User;
};
