const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema( {
    userName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    profileBanner: {
        type: String
    },
    bio: {
        type: String
    }
}, {timestamps: true});

const Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile;