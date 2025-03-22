const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Plans = sequelize.define('Plans', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    level: {
      type: DataTypes.ENUM('free', 'premium'),
      allowNull: true,
      defaultValue: 'free'      
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'plans',
    timestamps: false
  });

  return Plans;
};
