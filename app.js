const express = require('express');
const { sequelize, Idea, IdeaLike, UserRequest } = require('./models');
const cron = require('node-cron');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();


// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sincroniza os modelos com o banco de dados
sequelize.sync({force:false}).then(() => {
  console.log('Banco de dados sincronizado');
});

const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');
const IdeaRoutes = require('./routes/ideas');
const RequestRoutes = require('./routes/requests');

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Substitua pela URL do seu front-end
  credentials: true,  // Permite envio de cookies e headers de autenticação
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"] // Cabeçalhos permitidos
}));

app.use('/users', userRoutes);
app.use('/ideas', IdeaRoutes);
app.use('/requests',RequestRoutes);
app.use('/', sessionRoutes);



// Exemplo de cron job para inserir novas ideias com base nas categorias mais buscadas
cron.schedule('0 0 * * *', async () => {
  try {
    // Consulta as categorias mais populares a partir das requisições de usuários
    const popularCategories = await UserRequest.findAll({
      attributes: ['categoria_sugerida', [sequelize.fn('COUNT', sequelize.col('categoria_sugerida')), 'count']],
      group: ['categoria_sugerida'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 5,
    });

    popularCategories.forEach(async (item) => {
      // Insere uma nova ideia para a categoria popular
      await Idea.create({
        categoria: item.categoria_sugerida,
        descricao: 'Descrição gerada automaticamente',
      });
    });

    console.log('Cron job executado: Novas ideias adicionadas.');
  } catch (error) {
    console.error('Erro no cron job:', error);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
