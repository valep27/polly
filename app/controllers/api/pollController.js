const Poll = require('../../models/poll');

module.exports.create = (req, res, next) => {
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
            res.json(result);
        })
        .catch((err) => {
            res.status(400);
            res.json('failed to create a poll');
        });

};

module.exports.getLatest = (req, res, next) => {
    let findPoll = Poll.find()
        .sort({ created: 'desc' })
        .limit(1)
        .exec();

    findPoll
        .then((result) => {
            res.json(result);
        });
};