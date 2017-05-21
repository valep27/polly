const router = require('express').Router();
const Poll = require('../../models/poll');

router.post('/api/poll', (req, res) => {
    let input = req.body;

    if (!input) {
        res.status(400);
        res.send('must specify a poll to create');
        return;
    }

    let createPoll = Poll.create([{
        title: input.title,
        options: input.options.map((val) => { return { name: val } }),
    }]);

    createPoll
        .then((result) => {
            res.status(201);
            res.json(result[0]._id);
        })
        .catch((err) => {
            res.status(400);
            res.json('failed to create a poll');
        });
});

router.get('/api/poll', (req, res) => {
    let findPoll = Poll.find()
        .sort({ created: 'desc' })
        .limit(1)
        .exec();

    findPoll
        .then((result) => {
            res.json(result);
        });
});

module.exports = router;