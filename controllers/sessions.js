// controllers/sessionsController.js
const jwt = require("jsonwebtoken");
const hash = require("../middlewares/hash");

const {User,Session} = require("../models/");
const {generate} = require("../middlewares/auth");

const SessionsController = {

    login: async  (body) => {
        try{

            const { email, password } = body;
            
            const user = await User.findOne({ where: { email } });
            if (!user) return { message: "Usuário não encontrado", status:401 };
            
            const isValid = await hash.verify(user.senha, password);
            if (!isValid) return { message: "Senha inválida", status:401 };
            
            const token = generate(user.id);
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000 * 8); // 8 horas
            
            await Session.create({ userId: user.id, token, expiresAt });
            
            return { token, status: 200 };
        } catch (error) {
            console.error(error);
            return { message: 'Erro ao fazer login', error, status: 500 };
        }
    },

    
    logout: async (token) => {
      
      if (!token) return { message: "Token não fornecido", status: 400 };
    
      await Session.destroy({ where: { token } });
    
      return { message: "Logout realizado com sucesso", status: 200 };
    },

    checkSession: async (token) => {
      console.log('check-session')
      if (!token) return { message: "Token não fornecido", status: 400 };
    
      const session = await Session.findOne({ where: { token } });
      // console.log('session ',session.dataValues.userId)
      if (!session || new Date() > session.expiresAt) {
        return { message: "Sessão expirada ou inválida", status: 401 };
      }
    
      return { userId:session.dataValues.userId ,message: "Sessão válida", status: 200 };
    }
}



module.exports = SessionsController;
