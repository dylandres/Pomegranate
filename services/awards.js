const Award = require('../server/db/models/award.model.js')
const User = require('../server/db/models/user.model.js')
const Platform = require('../server/db/models/platform.model.js')

//awardType - string in form "awardType:val" where val is 0 for award types that do not require a val
const handleAward = async (user, award) => {
    const awardType = award.awardType.split(':')
    const type = awardType[0]
    const val = parseInt(awardType[1])
    if(type === "quizzesTaken") {
        //get number of quizzes taken by turning quiz history into set and counting
        const quizzes = []
        for(let i = 0; i < user.quizHistory.length; i++) {
            if(!(quizzes.includes(user.quizHistory[i].quizid)))
                quizzes.push(user.quizHistory[i].quizid)
        }
        if(quizzes.length >= val) {
            //put this user id into the award user[]
            await Award.updateOne({'_id' : award._id}, { $push: {users: user._id}})
            //and put this award into the user
            await User.updateOne({'_id' : user._id}, { $push: {awards: award._id}})
        }
    }
    else if (type === "subscribers") {
        // get all platforms owned by this user
        const platforms = await Platform.find({ 'ownerID': user._id })
        // add up this user's subscriber count across all platforms
        var subCount = 0;
        for (let i = 0; i < platforms.length; i++) {
            subCount += platforms[i].subscribers.length;
        }
        if (subCount >= val) {
            //put this user id into the award user[]
            await Award.updateOne({'_id' : award._id}, { $push: {users: user._id}})
            //and put this award into the user
            await User.updateOne({'_id' : user._id}, { $push: {awards: award._id}})
        }
    }
    else if (type == "quizzes") {
        // get all platforms owned by this user
        const platforms = await Platform.find({ 'ownerID': user._id })
        // for each platform, count up the number of quizzes created
        var quizCount = 0;
        for (let i = 0; i < platforms.length; i++) {
            quizCount += platforms[i].quizzes.length;
        }
        console.log("this dude got " + quizCount + " quizzes");
        if (quizCount >= val) {
            //put this user id into the award user[]
            await Award.updateOne({'_id' : award._id}, { $push: {users: user._id}})
            //and put this award into the user
            await User.updateOne({'_id' : user._id}, { $push: {awards: award._id}})
        }
    }
    else if (type == "platforms") {
        //get number of platforms under this user 
        const platformNum = await Platform.count({ 'ownerID': user._id })
        console.log("NUMBER OF PLATFORMS UNDER THIS USER" + platformNum)
        if(platformNum >= val) {
            //put this user id into the award user[]
            await Award.updateOne({'_id' : award._id}, { $push: {users: user._id}})
            //and put this award into the user
            await User.updateOne({'_id' : user._id}, { $push: {awards: award._id}})
        }
    }
}

exports.handleAward = handleAward