const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;

const AwardSchema = new Schema( {
    awardName : {
        type: String,
        required: true
    },
    awardPicture : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    awardType : {
        type: String,
        required: true
    },
    users : {
        type: [Schema.Types.ObjectID]
    }
    //add a platform value?
}, {timestamps: true});

const Award = mongoose.model('Award', AwardSchema)
module.exports = Award;