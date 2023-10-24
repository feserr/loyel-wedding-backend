const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TempPassword extends Model {
    static associate(models) {
      TempPassword.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    }
  }
  TempPassword.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TempPassword',
    },
  );
  return TempPassword;
};
