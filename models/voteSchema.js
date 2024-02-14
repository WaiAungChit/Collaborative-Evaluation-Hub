const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    variable: {
        type: String,
        enum: ['teamwork', 'creativity', 'innovation'],
        required: true
    },
    rating: {
        type: String,
        enum: ['agree', 'strongly agree', 'normal', 'disagree', 'strongly disagree'],
        required: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Vote', VoteSchema);