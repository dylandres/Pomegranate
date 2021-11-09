const { json } = require('express');
const express = require('express');
const router = express.Router();
const Award = require('../db/models/award.model.js');
const Platform = require('../db/models/platform.model.js');
const Question = require('../db/models/question.model.js');
const Quiz = require('../db/models/quiz.model.js');
const User = require('../db/models/user.model.js');
const ObjectId = require('mongodb').ObjectId;

////////////////////////////////login / auth ///////////////////////////
const { OAuth2Client } = require('google-auth-library')
const session = require('express-session')
const client = new OAuth2Client('954435352392-24bg4crh8bc1bkt4hbpq6ke6iadacv53.apps.googleusercontent.com')

router.post('/login', async (req, res, next) => {
    const {token} = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '954435352392-24bg4crh8bc1bkt4hbpq6ke6iadacv53.apps.googleusercontent.com'
    })
    const payload = ticket.getPayload()
    const email = payload.email
    const firstName = payload.given_name
    const lastName = payload.family_name
    const profilePicture = payload.picture
    User.findOne({email: email})
        .then(async user => {
            //if no user exists yet then create profile and user objects in DB
            if(!user) {
                const newUser = new User({userName: (firstName + lastName).replace(' ', ''), fullName: firstName + " " + lastName, profilePicture: profilePicture, profileBanner: '', bio: '',
                    email: email, subscriptions: [], awards: []})
                req.session.userId = newUser.id
                await newUser.save((err) => console.log(err))
                console.log("HI");
                console.log(newUser);
                console.log("HI2");
                return res.json(newUser)
            }
            //otherwise this user exists so update their profile in case 
            //google image or name changed, and return name and register as false
            else {
                //console.log(data)
                await User.updateOne({_id: user.id}, {
                    fullName: firstName + ' ' + lastName,
                    profilePicture: profilePicture
                })
                req.session.userId = user.id
                return res.json(req.user)
            }
        })
        .catch(next)
})

router.delete("/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

router.get('/getuser', async (req, res) => {
    res.status(200)
    res.send(req.user)
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
    Quiz.find({ 'quizName':  { $regex : new RegExp(req.params.query, "i") }})
        .then(data => {
            console.log('quiz')
            console.log(data)
            res.json(data)
        })
        .catch(next)
});

router.get('/users/:query/user', (req, res, next) => {
    User.find({ $or: [{'userName': { $regex : new RegExp(req.params.query, "i") }}, 
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
// router.get('/quizpages', (req, res, next) => {
//     QuizPage.find({})
//         .then(data => {
//             res.json(data)
//         })
//         .catch(next)
// });

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

router.get('/quizzes', (req, res, next) => {
    Quiz.find({})
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

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