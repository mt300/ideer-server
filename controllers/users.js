const sequelize = require('sequelize');
const { Idea, IdeaLike, UserRequest, User } = require('../models');
const hash = require('../middlewares/hash');

const usersController = {
    
    async registerUser(body) {
        const { nome, email, senha } = body;
        console.log('registerUser',body);
        try {
            const hashedPassword = await hash.hash(senha);

            await User.create({ nome, email, senha:hashedPassword });
            return {message:'Usuário registrado com sucesso!', status:200};
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao registrar o usuário', status: 500 };
        }
    },
    async listUsers() {
        try {
            const users = await User.findAll();
            return {users};
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao buscar os usuários', status: 500 };
        }
    },
    async getUser(params) {
        const { id,email } = params;
    
        try {
            if(id){
                const user = await User.findByPk(id);
                return user;
            }else if(email){
                const user = await User.findOne({ where: { email } });
                return user;
            }else{
                return { error: 'Usuário não encontrado', status: 404 };
            }
            
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao buscar o usuário', status:500 };
        }
    },
    async updateUser(params,body) {
        const { id } = params;
        const { nome, email, senha } = body;
        
        try {
            const hashedPassword = await hash.hash(senha);
            await User.update({ nome, email, senha:hashedPassword }, { where: { id } });
            res.status(200).send('Usuário atualizado com sucesso!');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o usuário' });
        }
    },
    async deleteUser(params) {
        const { id } = params;
    
        try {
            await User.destroy({ where: { id } });
            return {message:'Usuário deletado com sucesso!',status:200};
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao deletar o usuário',status :500 };
        }
    },
    
};

module.exports = { ...usersController };