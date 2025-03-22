const express = require('express');
const router = express.Router();
const RequestsController = require('../controllers/requests');
const {authenticate} = require('../middlewares/auth');

router.post('/', authenticate, async (req, res) => {
    const { tags,platform, category, humor } = req.body;
    // console.log('auth', req.auth);
    const userId = req.auth.userId;
    try {
        const response = await RequestsController.userRequest({userId, tags, category, platform,humor});

        res.status(response.status).json({...response});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no Request' });
    }
});
router.get('/' , async (req, res) => {
    try {
        const requests = await RequestsController.getRequests();
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os requests' });
    }
}),
module.exports = router;