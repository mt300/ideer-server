const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ideer', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // opcional: desativa logs SQL no console
});

// Importa os modelos
const Idea = require('./idea')(sequelize);
const IdeaLike = require('./idea-like')(sequelize);
const UserRequest = require('./user-request')(sequelize);
const User = require('./user')(sequelize);
const Session = require('./session')(sequelize);
const Plans = require('./plans')(sequelize);

// Definindo as associações
Idea.hasMany(IdeaLike, { foreignKey: 'ideaId', as: 'ideaLikes' });
IdeaLike.belongsTo(Idea, { foreignKey: 'ideaId', as: 'idea' });

Idea.belongsTo(UserRequest, { foreignKey: 'requestId', as: 'request' });
UserRequest.hasMany(Idea, { foreignKey: 'requestId', as: 'ideas' });

User.hasMany(Idea, { foreignKey: 'userId', as: 'ideas' });
Idea.hasOne(User, { foreignKey: 'userId', as: 'user' });

Plans.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Plans, { foreignKey: 'userId', as: 'plan' });

User.hasMany(IdeaLike, { foreignKey: 'userId', as: 'userLikes' });
IdeaLike.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(UserRequest, { foreignKey: 'userId', as: 'requests' });
UserRequest.belongsTo(User, { foreignKey: 'userId', as: 'user' });


module.exports = {
  sequelize,
  Idea,
  IdeaLike,
  UserRequest,
  User,
  Session,
  Plans
};
