const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizPageSchema = new Schema( {
    quizName : {
        type: String,
        required: true
    },
    quizLogo : {
        type: String
    },
    quizBanner : {
        type: String
    },
    summary : {
        type: String
    },
    timesTaken : {
        type: Number
    }
}, {timestamps: true});

const QuizPage = mongoose.model('QuizPage', QuizPageSchema)
module.exports = QuizPage;