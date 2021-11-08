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
    },
    quizName : {
        type: String,
        required: true
    },
    // ***proposed changes***
    // quizLogo : {
    //     type: String
    // },
    // quizBanner : {
    //     type: String
    // },
    // summary : {
    //     type: String
    // },
    // timesTaken : {
    //     type: Number
    // }
}, {timestamps: true});

const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = Quiz;