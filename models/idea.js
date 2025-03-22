const { request } = require('express');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Idea = sequelize.define('Idea', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    requestId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'user_requests',
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    category: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    humor: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    popularidade: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    edit: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'ideas',
    timestamps: false,
  });

  return Idea;
};
