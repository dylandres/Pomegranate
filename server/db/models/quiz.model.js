const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema( {
    ownerID : {
        type: Schema.Types.ObjectID,
        required: true
    },
    quizPage : {
        type: Schema.Types.ObjectID,
        required: true
    },
    questions : {
        type: [Schema.Types.ObjectID],
        required: true
    },
    leaderboard : {
        type: Map,
        required: true
    }
}, {timestamps: true});

const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = Quiz;