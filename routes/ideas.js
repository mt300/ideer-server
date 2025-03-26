const express = require('express');
const router = express.Router();
const IdeaController = require('../controllers/ideas');
const {authenticate} = require('../middlewares/auth');

router.get('/',authenticate, async (req, res) => {
    // const user = req.user;
    try {
        const ideas = await IdeaController.getIdeas({category: req.query.category||null});
        res.json(ideas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os ideias' });
    }
}),
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    // console.log('request user', req.user)
    // console.log('id user no idea router ',id)
    try {
        const ideas = await IdeaController.getIdeaByUserID({id});
        res.json(ideas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar ideias do usuario', userId: id });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const idea = await IdeaController.getIdea({id});
        res.json(idea);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar a ideia pelo id' });
    }
});
router.get('/edits', async (req, res) => {
    
    try {
        const ideas = await IdeaController.getEdits();
        res.json(ideas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o ideias' });
    }
});
router.post('/', authenticate,async (req, res) => {
    const { tags,descricao, categoria } = req.body;
    const userId = req.user.id;
    try {
        const response = await IdeaController.createIdea({ userId, tags, descricao, categoria });

        res.status(response.status).send(response.message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
});
router.put('/edit/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { edit, tags, categoria, platform, humor } = req.body;
    try {
        console.log('edit',edit)
        const response = await IdeaController.editIdea({ id }, { edit, tags, categoria, platform, humor });

        res.status(response.status).send(response.message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar a ideia' });
    }
});

module.exports = router;