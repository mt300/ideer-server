const {Idea} = require('../models');
const { Op } = require('sequelize');

const ideasControllers = {
    getIdeas: async ({category}) => {
        try{
            if(category){
                const ideas = Idea.findAll({where: {categoria: category}})
                return ideas
            }else{

                const ideas = Idea.findAll()
                return ideas
            }
        }catch(error){
            console.error(error)
            return {error: 'Erro ao buscar as ideias', status: 500}
        }  
    },
    getIdea: async (params) => {
        const { id } = params;
        try{
            const idea = Idea.findByPk(id)
            return idea
        }catch(error){
            console.error(error)
            return {error: 'Erro ao buscar a ideia', status: 500}
        }
    },
    getIdeaByUserID: async (params) => {
        const { id } = params;
        console.log('id',id)
        try{
            const ideas = await Idea.findAll({where: {userId:id }})
            console.log("sajdoajdoijao  " + id,ideas)
            return ideas
        }catch(error){
            console.error(error)
            return {error: 'Erro ao buscar a ideia do usuario ', status: 500}
        }
    },
    editIdea: async (params, body) => {
        const { id } = params;
        const { edit, tags,categoria } = body;
        try{
            await Idea.update({ edit, tags, categoria }, {where: {id}})
            return {message: 'Ideia editada com sucesso!', status: 200}
        }catch(error){
            console.error(error)
            return {error: 'Erro ao editar a ideia', status: 500}
        }
    },
    createIdea: async (body) => {
        const { userId, categoria, content, tags } = body;
        try{
            await Idea.create({ categoria, content, tags, userId })
            return {message: 'Ideia criada com sucesso!', status: 200}
        }catch(error){
            console.error(error)
            return {error: 'Erro ao criar a ideia', status: 500}
        }
    },
    getEdits: async (params) => {
        try{
            const ideas = Idea.findAll({where: {edit: {[Op.ne]: null}}})
            return ideas
        }catch(error){
            console.error(error)
            return {error: 'Erro ao buscar a ideia', status: 500}
        }
    },

}
module.exports = ideasControllers;