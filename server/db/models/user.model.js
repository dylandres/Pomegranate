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
    profile: {
        type: Schema.Types.ObjectID,
        required: true
    },
    awards: {
        type: [Schema.Types.ObjectID],
        required: true
    },
    // ***proposed changes***
    // userName: {
    //     type: String,
    //     required: true,
    // },
    // fullName: {
    //     type: String,
    //     required: true
    // },
    // profilePicture: {
    //     type: String
    // },
    // profileBanner: {
    //     type: String
    // },
    // bio: {
    //     type: String
    // }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema)
module.exports = User;