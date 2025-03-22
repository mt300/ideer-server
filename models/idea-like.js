const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const IdeaLike = sequelize.define('IdeaLike', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ideaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ideas',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    likedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'idea_likes',
    timestamps: false,
  });

  return IdeaLike;
};
