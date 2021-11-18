const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatformSchema = new Schema( {
    ownerID: {
        type: Schema.Types.ObjectID,
        required: true
    },
    subscribers: {
        type: [Schema.Types.ObjectID],
        required: true
    },
    platformName: {
        type: String,
        required: true
    },
    platformLogo: {
        type: String
    },
    platformBanner: {
        type: String
    },
    description: {
        type: String
    },
    quizzes: {
        type: [Schema.Types.ObjectID],
        required: true
    },
    leaderboard: {
        type: Object,
        required: true
    }
}, {timestamps: true});

const Platform = mongoose.model('Platform', PlatformSchema)
module.exports = Platform;