const router = require('express').Router();
const pollController = require('./controllers/api/pollController');

router.get('/', (req, res) => { res.render('index', { title: 'Express' }); });

// api
router.use(pollController);

module.exports = router;