const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema( {
    ownerID : {
        type: Schema.Types.ObjectID,
        required: true
    },
    question : {
        type: String,
        required: true
    },
    choices : {
        type: [String],
        required: true
    },
    answer : {
        type: Number, //int representing which array index of choices is the correct answer
        required: true
    }
}, {timestamps: true});

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question;