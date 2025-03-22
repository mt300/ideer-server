const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');


router.get('/', async (req, res) => {
    try {
        const users = await UserController.listUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os usuários' });
    }
}),
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserController.getUser({id});
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
});
router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserController.get({email});
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
});
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const response = await UserController.registerUser({ nome:name, email, senha:password });

        res.status(response.status).json({message:response.message});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
});

module.exports = router;