const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/sessions');
const UserController = require('../controllers/users');
const {authenticate} = require('../middlewares/auth');
// const user = require('../models/user');

router.get('/session', authenticate, async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log('session route')
    try {
        const session  = await SessionController.checkSession(token);
        console.log('session ID',session)

        const user = await UserController.getUser({id:session.userId});
        console.log('user ',user)
        res.status(session.status).json({message:session.message,user:user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sessão expirada ou inválida' });
    }
}),
router.post('/login', async (req, res) => {
    const { email,password } = req.body;
    console.log('login route')
    try {
        const {token, status} = await SessionController.login({email,password});
        res.status(status).json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});
router.post('/logout', authenticate, async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        const {status,message} = await SessionController.logout(token);
        res.status(status).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao encerrar sessão' });
    }
});

module.exports = router;