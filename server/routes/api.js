const { json } = require('express');
const express = require('express');
const router = express.Router();
const Award = require('../db/models/award.model.js');
const Platform = require('../db/models/platform.model.js');
const Profile = require('../db/models/profile.model.js');
const Question = require('../db/models/question.model.js');
const Quiz = require('../db/models/quiz.model.js');
const QuizPage = require('../db/models/quizPage.model.js');
const User = require('../db/models/user.model.js');
const ObjectId = require('mongodb').ObjectId;

////////////////////////////////login / auth ///////////////////////////

router.post('/login', (req, res, next) => {
    const userObj = req.body
    const email = userObj.email
    const famName = userObj.famName
    const givenName = userObj.givenName
    User.find({email: email})
        .then(data => {
            //if data is empty array then this user has never logged in before
            console.log("WOWOWOW" + data)
            if(!data.length) {
                console.log('not empty')
                console.log(data + 'not empty')
                Profile.create({userName: givenName + famName, fullName: givenName + " " + famName, profilePicture: '', profileBanner: '', bio: ''}, (err) => console.log(err))

            }
            //otherwise this user exists
            else {
                //console.log(data)
            }
        })
        .catch(next)
})




/////////////////////////////////SEARCH STUFF////////////////////////////////
router.get('/users/:query/platform', (req, res, next) => {
                                            // regex for case insensitive query
    Platform.find({ 'platformName': { $regex : new RegExp(req.params.query, "i") } })
        .then(data => {
            console.log('platform')
            console.log(data)
            res.json(data)
        })
        .catch(next)
});

router.get('/users/:query/quiz', (req, res, next) => {
    QuizPage.find({ 'quizName':  { $regex : new RegExp(req.params.query, "i") }})
        .then(data => {
            console.log('quiz')
            console.log(data)
            res.json(data)
        })
        .catch(next)
});

router.get('/users/:query/user', (req, res, next) => {
    Profile.find({ $or: [{'userName': { $regex : new RegExp(req.params.query, "i") }}, 
                         {'fullName': { $regex : new RegExp(req.params.query, "i")}}] })
        .then(data => {
        console.log('user')
        console.log(data)
        res.json(data)
        })
        .catch(next)
});

//////////////////////////////////USER//////////////////////////////////
router.get('/users', (req, res, next) => {
    User.find({}, '-updatedAt')
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.get('/users/:profileID', (req, res, next) => {
    User.findOne({'profile': req.params.profileID})
    .then(data => res.json(data))
    .catch(next)
})

router.post('/users', (req, res, next) => {
    User.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.delete('/users/:id', (req, res, next) => {
    User.findOneAndDelete({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

//////////////////////////////////PROFILE//////////////////////////////////
router.get('/profiles', (req, res, next) => {
    Profile.find({}, '-updatedAt')
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.post('/profiles', (req, res, next) => {
    Profile.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.delete('/profiles/:id', (req, res, next) => {
    Profile.findOneAndDelete({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

//////////////////////////////////QUIZPAGE//////////////////////////////////
router.get('/quizpages', (req, res, next) => {
    QuizPage.find({})
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.get('/quizpages/:id', (req, res, next) => {
    QuizPage.findOne({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
})

router.post('/quizpages', (req, res, next) => {
    QuizPage.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.delete('/quizpages/:id', (req, res, next) => {
    QuizPage.findOneAndDelete({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

//////////////////////////////////AWARD//////////////////////////////////
router.get('/awards', (req, res, next) => {
    Award.find({}, '-updatedAt')
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.post('/awards', (req, res, next) => {
    Award.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.delete('/awards/:id', (req, res, next) => {
    Award.findOneAndDelete({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

//////////////////////////////////PLATFORM//////////////////////////////////
router.get('/platforms', (req, res, next) => {
    Platform.find({}, '-updatedAt')
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.get('/platforms/:name', (req, res, next) => {
    Platform.findOne({'platformName': req.params.name})
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.get('/platforms/:ownerID/profile', (req, res, next) => {
    console.log(req.params.ownerID);
    Platform.find({'ownerID': req.params.ownerID})
    .then(data => {
        res.json(data)
    })
    .catch(next)
})

router.post('/platforms', (req, res, next) => {
    Platform.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.delete('/platforms/:id', (req, res, next) => {
    Platform.findOneAndDelete({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

//////////////////////////////////QUIZ//////////////////////////////////
router.get('/quizzes/:quizName', (req, res, next) => {
    Quiz.find({ 'quizName': req.params.quizName })
        .then(data => {
            console.log('quiz')
            console.log(req.params.query);
            console.log(data)
            res.json(data)
        })
        .catch(next)
});

// router.get('/quizzes', (req, res, next) => {
//     Quiz.find({}, '-updatedAt')
//         .then(data => {
//             res.json(data)
//         })
//         .catch(next)
// });

// router.post('/quizzes', (req, res, next) => {
//     Quiz.create(req.body)
//         .then(data => res.json(data))
//         .catch(next)
// });

// router.delete('/quizzes/:id', (req, res, next) => {
//     Quiz.findOneAndDelete({'_id': req.params.id})
//         .then(data => res.json(data))
//         .catch(next)
// });

//////////////////////////////////QUESTION//////////////////////////////////
router.get('/questions/:id', (req, res, next) => {
    Question.find({_id: ObjectId(req.params.id)})
        .then(data => {
            console.log('ques');
            console.log(data);
            res.json(data)
        })
        .catch(next)
});

// router.post('/questions', (req, res, next) => {
//     Question.create(req.body)
//         .then(data => res.json(data))
//         .catch(next)
// });

// router.delete('/questions/:id', (req, res, next) => {
//     Question.findOneAndDelete({'_id': req.params.id})
//         .then(data => res.json(data))
//         .catch(next)
// });

module.exports = router;