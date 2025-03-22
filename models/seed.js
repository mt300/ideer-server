const { sequelize, User, Idea, UserRequest, IdeaLike } = require('./');
const hash = require('../middlewares/hash');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // Apaga e recria as tabelas

    const hashedPassword = await hash.hash('123456');
    // Criando um usuário
    const user = await User.create({
      nome: 'Usuário Teste',
      email: 'teste@example.com',
      senha: hashedPassword,
    });

    // Criando 3 ideias
    const ideas = await Promise.all([
      Idea.create({ titulo: 'Ideia 1', descricao: 'Descrição da Ideia 1', usuario_id: user.id }),
      Idea.create({ titulo: 'Ideia 2', descricao: 'Descrição da Ideia 2', usuario_id: user.id }),
      Idea.create({ titulo: 'Ideia 3', descricao: 'Descrição da Ideia 3', usuario_id: user.id }),
    ]);

    // Criando uma requisição de usuário
    const userRequest = await UserRequest.create({
      usuario_id: user.id,
      tipo: 'suporte',
      status: 'pendente',
      descricao: 'Preciso de ajuda com uma funcionalidade.',
    });

    // Criando uma curtida em uma ideia
    const like = await IdeaLike.create({
      idea_id: ideas[0].id, // Curtindo a primeira ideia
      usuario_id: user.id,
    });

    console.log('Banco de dados populado com sucesso!');
    process.exit();
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
    process.exit(1);
  }
}

seedDatabase();
