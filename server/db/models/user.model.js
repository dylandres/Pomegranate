const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema( {
    email: {
        type: String,
        required: true,
    },
    subscriptions: {
        type: [Schema.Types.ObjectID],
        required: true
    },
    awards: {
        type: [Schema.Types.ObjectID],
        required: true
    },
    bio: {
        type: String
    },
    fullName: {
        type: String,
        required: true
    },
    profileBanner: {
        type: String
    },
    profilePicture: {
        type: String
    },
    userName: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema)
module.exports = User;