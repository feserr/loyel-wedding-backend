const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Key extends Model {
    static associate(_models) {}
  }
  Key.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Key',
    },
  );
  return Key;
};
