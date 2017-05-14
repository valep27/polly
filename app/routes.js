const router = require('express').Router();
const pollController = require('./controllers/api/pollController');

router.get('/', (req, res, next) => { res.render('index', { title: 'Express' }); });

// api
router.get('/api/poll', pollController.getLatest);
router.post('/api/poll', pollController.create);

module.exports = router;