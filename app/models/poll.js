const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PollSchema = new Schema({
    title: { type: String, trim: true, minlength: 3, required: true },
    created: { type: Date, default: Date.now },
    options: {
        type: [{
            name: { type: String, trim: true, minlength: 1, required: true },
            votes: { type: Number, min: 0, default: 0 }
        }],
        validate: arr => arr.length > 1,
        required: true
    },
});

module.exports = mongoose.model('Polls', PollSchema);