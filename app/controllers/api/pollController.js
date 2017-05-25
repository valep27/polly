const mongoose = require('mongoose');
const router = require('express').Router();
const Poll = require('../../models/poll');

router.post('/api/poll', (req, res) => {
    let input = req.body;

    if (!input) {
        res.status(400).send('must specify a poll to create');
        return;
    }

    let createPoll = Poll.create([{
        title: input.title,
        options: input.options.map((val) => { return { name: val } }),
    }]);

    createPoll
        .then(result => {
            res.status(201).json(result[0]._id);
        })
        .catch(err => {
            res.status(400).json('failed to create a poll');
        });
});

router.put('/api/poll/:pollId/vote/:optionId', (req, res) => {
    let pollId = req.params.pollId;
    let optionId = req.params.optionId;

    if (mongoose.Types.ObjectId.isValid(pollId) === false) {
        res.status(400).send('pollId parameter is invalid');
        return;
    }

    if (mongoose.Types.ObjectId.isValid(optionId) === false) {
        res.status(400).send('optionId parameter is invalid');
        return;
    }

    Poll.findById(pollId).exec()
        .then(poll => {
            if (!poll) {
                res.status(404).send();
                return Promise.resolve();
            }

            let option = poll.options.find(val => val._id == optionId);
            option.votes += 1;

            return Poll.update({ _id: pollId }, poll);
        }).then(result => {
            res.status(204).send();
        }).catch(err => {
            res.status(400).send();
        });
});

router.get('/api/poll', (req, res) => {
    let findPoll = Poll.find()
        .sort({ created: 'desc' })
        .limit(1)
        .exec();

    findPoll
        .then(result => {
            res.json(result);
        });
});

router.get('/api/poll/:pollId', (req, res) => {
    let id = req.params.pollId;

    if (mongoose.Types.ObjectId.isValid(id) === false) {
        res.status(400).send('pollId parameter is invalid');
        return;
    }

    let findPoll = Poll.findById(id).exec();

    findPoll.then(result => {
        if (result) {
            res.json(result);
        } else {
            res.status(404).send();
        }
    });
});

module.exports = router;