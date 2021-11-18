const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema( {
    ownerID : {
        type: Schema.Types.ObjectID,
        required: true
    },
    questions : {
        type: [Schema.Types.ObjectID],
        required: true
    },
    leaderboard : {
        type: Object,
        required: true
    },
    quizName : {
        type: String,
        required: true
    },
    quizBanner : {
        type: String
    },
    quizLogo : {
        type: String
    },
    summary : {
        type: String
    },
    timesTaken : {
        type: Number
    },
    totalRating : {
        type: Number
    },
    totalVotes : {
        type: Number
    }
}, {timestamps: true});

const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = Quiz;