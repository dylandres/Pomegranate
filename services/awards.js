const Award = require('../server/db/models/award.model.js')
const User = require('../server/db/models/user.model.js')

//awardType - string in form "awardType:val" where val is 0 for award types that do not require a val
const handleAward = async (user, award) => {
    const awardType = award.awardType.split(':')
    const type = awardType[0]
    const val = parseInt(awardType[1])
    if(type === "quizzesTaken") {
        //get number of quizzes taken by turning quiz history into set and counting
        const quizzes = []
        for(i = 0; i < user.quizHistory.length; i++) {
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
}


exports.handleAward = handleAward