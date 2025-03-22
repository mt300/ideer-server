const { request } = require('express');
const { User, UserRequest,Plans, Idea } = require('../models');
const { generatePostIdeas } = require('../services/ideaGenerator');

const { Op } = require('sequelize');
const MAX_REQUESTS = 15;

const requestsController = {
    async userRequest(body){
        // const {id} = user;
        const {userId:id,tags,category, platform, humor} = body;
        console.log('userRequest',body);
        try{
            //check users plan
            const userPlan = Plans.findOne({ where: { userId: id } });
            if(userPlan.level === 'free'){
                return {error: 'Plano gratuito não permite requisições', status: 400}
            }else if(userPlan.level === 'premium' && userPlan.expiresAt < new Date()){
                return {error: 'Plano premium expirado', status: 400}
            }
            
            //check users todays requests
            const todaysRequests = UserRequest.findAll({
                where: {
                    userId: id,
                    createdAt: {
                        [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
                    }
                }
            })
            if(todaysRequests.length >= MAX_REQUESTS){
                return {error: 'Limite de requisições diárias atingido', status: 400}
            }
            //check if user has already requested this category
            const response = await generatePostIdeas(platform, category, tags, humor);

            const requestCreated = await UserRequest.create({
                userId: id,
                tags,
                category,
                platform
            });
            response.forEach(async idea => {
                console.log('data', {
                    platform,
                    category,
                    content: idea,
                })
                await Idea.create({ 
                    userId: id,
                    category,
                    content: idea,
                    tags,
                    humor,
                    platform,
                    requestId: requestCreated.id
                });
            })

            
            return {ideas:response, status: 200};

        }catch(error){
            console.error(error)
            return {error: 'Erro ao registrar a requisição', status: 500}
        }
    },
    async getRequests(){
        try{
            const requests = await UserRequest.findAll();
            return {requests};
        }catch(error){
            console.error(error);
            return {error: 'Erro ao buscar as requisições', status: 500};
        }
    },
}

module.exports = {...requestsController};