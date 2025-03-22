const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserRequest = sequelize.define('UserRequest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      deafaultValue: 'Conteudo Generico',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'user_requests',
    timestamps: false,
  });

  return UserRequest;
};
