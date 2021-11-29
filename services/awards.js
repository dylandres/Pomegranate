const Award = require('../server/db/models/award.model.js')
const User = require('../server/db/models/user.model.js')

const handleAward = async (user, award) => {
    console.log(award + "THIS IS ATYPE")
    console.log(user + "THIS IS THE USER")
    const awardType = award.awardType.split(':')
    const type = awardType[0]
    const val = parseInt(awardType[1])
    if(type === "quizzesTaken") {
        //get number of quizzes taken by turning quiz history into set and counting
        const quizzes = []
        for(i = 0; i < user.quizHistory.length; i++) {
            if(!(quizzes.includes(user.quizHistory[i].quizid)))
                quizzes.push(user.quizHistory[i].quizid)
                console.log("PUSHED A QUIZ")
        }
        console.log('NUM QUIZZES TAKEN IS' + quizzes.length)
        if(quizzes.length >= val) {
            //put this user id into the award user[]
            await Award.updateOne({'_id' : award._id}, { $push: {users: user._id}})
            //and put this award into the user
            await User.updateOne({'_id' : user._id}, { $push: {awards: award._id}})
            console.log("AWARD WAS CREATED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        }
    }
}


exports.handleAward = handleAward