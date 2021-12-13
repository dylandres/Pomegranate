const { json } = require('express');
const express = require('express');
const router = express.Router();
const Award = require('../db/models/award.model.js');
const Platform = require('../db/models/platform.model.js');
const Question = require('../db/models/question.model.js');
const Quiz = require('../db/models/quiz.model.js');
const User = require('../db/models/user.model.js');
const ObjectId = require('mongodb').ObjectId;
const upload = require("../../services/ImageUpload");
const awardsAPI = require("../../services/awards.js")
const aws = require("aws-sdk");
const singleUpload = upload.single("image");
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: "us-east-1",
});

const s3 = new aws.S3();

//////////////////////////////////image/////////////////////////////////
router.put("/platforms/:id/change-logo", function (req, res) {
    const uid = req.params.id;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const params = {
            Bucket: req.file.bucket,
            Key: req.file.key
        }
        const url = s3.getSignedUrl('getObject', params).split("?AWS")[0];
         
        let update = { platformLogo: url };
        Platform.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

router.put("/questions/:id/question-image", function (req, res) {
    const uid = req.params.id;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const params = {
            Bucket: req.file.bucket,
            Key: req.file.key
        }
        const url = s3.getSignedUrl('getObject', params).split("?AWS")[0];
         
        let update = { image : url };
        Question.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

router.put("/questions/:id/question-image/delete", function (req, res, next) {
    const uid = req.params.id;
    Question.findByIdAndUpdate(uid, {image: ''}, {new: true})
        .then(data => res.json(data)).catch(next);
});

router.put("/platforms/:id/change-banner", function (req, res) {
    const uid = req.params.id;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const params = {
            Bucket: req.file.bucket,
            Key: req.file.key
        }
        const url = s3.getSignedUrl('getObject', params).split("?AWS")[0];
        let update = { platformBanner: url };
        Platform.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

router.put("/quizzes/:id/change-logo", function (req, res) {
    const uid = req.params.id;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const params = {
            Bucket: req.file.bucket,
            Key: req.file.key
        }
        const url = s3.getSignedUrl('getObject', params).split("?AWS")[0];
        let update = { quizLogo: url };
        Quiz.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

router.put("/quizzes/:id/change-banner", function (req, res) {
    const uid = req.params.id;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const params = {
            Bucket: req.file.bucket,
            Key: req.file.key
        }
        const url = s3.getSignedUrl('getObject', params).split("?AWS")[0];
        let update = { quizBanner: url };
        Quiz.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

router.put("/users/:id/change-pic", function (req, res) {
    const uid = req.params.id;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const params = {
            Bucket: req.file.bucket,
            Key: req.file.key
        }
        const url = s3.getSignedUrl('getObject', params).split("?AWS")[0];
         
        let update = { profilePicture: url };
        User.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

router.put("/users/:id/change-banner", function (req, res) {
    const uid = req.params.id;
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const params = {
            Bucket: req.file.bucket,
            Key: req.file.key
        }
        const url = s3.getSignedUrl('getObject', params).split("?AWS")[0];
        let update = { profileBanner: url };
        User.findByIdAndUpdate(uid, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});
////////////////////////////////login / auth ///////////////////////////

const { OAuth2Client } = require('google-auth-library')
const session = require('express-session')
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)

router.post('/login', async (req, res, next) => {
    const {token} = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENTID
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
                await newUser.save()
                return res.json(newUser)

            }
            //otherwise this user exists so update their profile in case 
            else {
                // 
                await User.updateOne({ _id: user.id }, {
                    fullName: firstName + ' ' + lastName,
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
    Platform.find({ 'platformName': { $regex: new RegExp(req.params.query, "i") } })
        .then(data => {
             
             
            res.json(data)
        })
        .catch(next)
});

router.get('/users/:query/quiz', (req, res, next) => {
    Quiz.find({ 'quizName': { $regex: new RegExp(req.params.query, "i") } })
        .then(data => {
             
             
            res.json(data)
        })
        .catch(next)
});

router.get('/users/:query/user', (req, res, next) => {
    User.find({
        $or: [{ 'userName': { $regex: new RegExp(req.params.query, "i") } },
        { 'fullName': { $regex: new RegExp(req.params.query, "i") } }]
    })
        .then(data => {
             
             
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
router.put('/users/quiz_history/:quizid/:quiz/:id/:score/:timestamp', (req, res, next) => {
    const uid = req.params.id;
    const update = {
        $push: {
            'quizHistory': {
                $each: [{'quiz': req.params.quiz,
                         'quizid': req.params.quizid,
                         'score': req.params.score,
                         'timestamp': req.params.timestamp}],
                //  Only keep 20 quizzes in history
                // $slice: 20,
                $position: 0
            }
        }
    }
    User.findByIdAndUpdate(uid, update)
        .then(data => res.json(data))
        .catch(next)
});

router.get('/users/:profileID', (req, res, next) => {
    User.findOne({ 'profile': req.params.profileID })
        .then(data => res.json(data))
        .catch(next)
})

router.post('/users', (req, res, next) => {
    User.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.delete('/users/:id', (req, res, next) => {
    User.findOneAndDelete({ '_id': req.params.id })
        .then(data => res.json(data))
        .catch(next)
});

router.put('/users/:id/bio', (req, res, next) => {
    const uid = req.params.id;
    User.findByIdAndUpdate(uid, {$set: {'bio': req.body.bio}})
    .then(data => res.json(data))
    .catch(next);
});

router.put('/users/:id/:platformID/subscribe', (req, res, next) => {
    const uid = req.params.id;
    const pid = ObjectId(req.params.platformID);
    User.findByIdAndUpdate(uid, {$push: {'subscriptions': pid}})
    .then(data => res.json(data))
    .catch(next);
});

router.put('/users/:id/:platformID/unsubscribe', (req, res, next) => {
    const uid = req.params.id;
    const pid = ObjectId(req.params.platformID);
    User.findByIdAndUpdate(uid, {$pull: {'subscriptions': pid}})
    .then(data => res.json(data))
    .catch(next);
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
    Profile.findOneAndDelete({ '_id': req.params.id })
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
    QuizPage.findOne({ '_id': req.params.id })
        .then(data => res.json(data))
        .catch(next)
})

router.post('/quizpages', (req, res, next) => {
    QuizPage.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.delete('/quizpages/:id', (req, res, next) => {
    QuizPage.findOneAndDelete({ '_id': req.params.id })
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

router.get('/awards/:id', async (req, res, next) => {
    const awards = await Award.find({'users' : req.params.id})
    res.json(awards)
})

router.post('/awards', (req, res, next) => {
    Award.create(req.body)
        .then(data => res.json(data))
        .catch(next)
});

//update awards for this user
router.put('/awards/:id', async (req, res, next) => {
    //check all awards that do NOT have user and then give it to them if they have satisfied the requirement
    const awards = await Award.find({'users': {$ne: req.params.id} })
    const user = await User.findOne({'_id' : req.params.id})
    for(let i = 0; i < awards.length; i++) {
        //function call to handle awards
        await awardsAPI.handleAward(user, awards[i])
    }
    const updatedAwards = await User.findOne({'_id' : req.params.id})
    res.json(updatedAwards)
})

router.delete('/awards/:id', (req, res, next) => {
    Award.findOneAndDelete({ '_id': req.params.id })
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
    Platform.findOne({ 'platformName': req.params.name })
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.put('/platforms/:id/description', (req, res, next) => {
    const uid = req.params.id;
    Platform.findByIdAndUpdate(uid, {$set: {'description': req.body.desc}})
    .then(data => res.json(data))
    .catch(next);
})

router.get('/platforms/:ownerID/profile', (req, res, next) => {
     
    Platform.find({ 'ownerID': req.params.ownerID })
        .then(data => {
            res.json(data)
        })
        .catch(next)
})

router.get('/platforms/by_id/:id', (req, res, next) => {
    Platform.find({ '_id': req.params.id })
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
    Platform.findOneAndDelete({ '_id': req.params.id })
        .then(data => res.json(data))
        .catch(next)
});

router.put('/platforms/:id/:userID/subscribe', (req, res, next) => {
    const pid = req.params.id;
    const uid = ObjectId(req.params.userID);
    Platform.findByIdAndUpdate(pid, {$push: {'subscribers': uid}})
    .then(data => res.json(data))
    .catch(next);
});

router.put('/platforms/:id/:userID/unsubscribe', (req, res, next) => {
    const pid = req.params.id;
    const uid = ObjectId(req.params.userID);
    Platform.findByIdAndUpdate(pid, {$pull: {'subscribers': uid}})
    .then(data => res.json(data))
    .catch(next);
});

router.put('/platforms/:id/:quizID/add-quiz', (req, res, next) => {
    const pid = req.params.id;
    const qid = ObjectId(req.params.quizID);
    Platform.findByIdAndUpdate(pid, {$push: {'quizzes': qid}})
    .then(data => res.json(data))
    .catch(next);
});

router.put('/platforms/:id/:quizID/remove-quiz', (req, res, next) => {
    const pid = req.params.id;
    const qid = ObjectId(req.params.quizID);
    Platform.findByIdAndUpdate(pid, {$pull: {'quizzes': qid}})
    .then(data => res.json(data))
    .catch(next);
});

//////////////////////////////////QUIZ//////////////////////////////////
router.get('/quizzes/by_id/:quiz_id', (req, res, next) => {
    const qid = ObjectId(req.params.quiz_id);
    Quiz.find({ '_id': qid })
        .then(data => {
             
             
            res.json(data)
        })
        .catch(next)
});

router.put('/quizzes/:id/summary', (req, res, next) => {
    const qid = ObjectId(req.params.id);
     
    Quiz.findByIdAndUpdate(qid, {'summary': req.body.summary})
    .then(data => res.json(data))
    .catch(next);
})

router.put('/quizzes/:id/published', (req, res, next) => {
    const qid = ObjectId(req.params.id);
     
    Quiz.findByIdAndUpdate(qid, {'published': req.body.published})
    .then(data => res.json(data))
    .catch(next);
})

router.put('/quizzes/add_to_leaderboard/:id/:username/:score', (req, res, next) => {
    const qid = ObjectId(req.params.id);
    // Adds (player, score) to leaderboard
    // If player exists, just update score
    const key = "leaderboard." + req.params.username;
    const value = req.params.score;
     
     
    var update = { "$set" : {} }
    update["$set"][key] = value
    Quiz.findByIdAndUpdate(qid, update)
    .then(data => {
         
         
        res.json(data);
    })
    .catch(next);
});

router.get('/quizzes/:quizName', (req, res, next) => {
     
    Quiz.find({ 'quizName': req.params.quizName })
        .then(data => {
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

router.put('/quizzes/:id/incrementNumTaken', (req, res, next) => {
    const qid = req.params.id;
    Quiz.findByIdAndUpdate(qid, {$inc: {'timesTaken': 1}})
        .then(data => {
             
             
             
            res.json(data)
        })
        .catch(next)
});

router.put('/quizzes/:id/rate/:rating', (req, res, next) => {
    const qid = req.params.id;
    const rating = req.params.rating;
    Quiz.findByIdAndUpdate(qid, {$inc: {'totalVotes': 1, 'totalRating': rating}})
        .then(data => {
             
             
             
            res.json(data)
        })
        .catch(next)
});

 router.post('/quizzes', (req, res, next) => {
     Quiz.create(req.body)
         .then(data => res.json(data))
         .catch(next)
 });

 router.put('/quizzes/:quizid/:questionid/newQuestion', (req, res, next) => {
     quizID = req.params.quizid;
      
     questionID = req.params.questionid;
      
     Quiz.findByIdAndUpdate(quizID, {$push: {'questions': questionID}})
     .then(data => res.json(data))
     .catch(next);
 })

 router.put('/quizzes/:quizid/:questionid/deleteQuestion', (req, res, next) => {
    quizID = req.params.quizid;
     
    questionID = req.params.questionid;
     
    Quiz.findByIdAndUpdate(quizID, {$pull: {'questions': questionID}})
    .then(data => res.json(data))
    .catch(next);
})

 router.delete('/quizzes/:id', (req, res, next) => {
     Quiz.findOneAndDelete({'_id': ObjectId(req.params.id)})
         .then(data => res.json(data))
         .catch(next)
 });

//////////////////////////////////QUESTION//////////////////////////////////
router.get('/questions/:id', (req, res, next) => {
    Question.find({ _id: ObjectId(req.params.id) })
        .then(data => {
             
             
            res.json(data)
        })
        .catch(next)
});

router.put('/questions/:id', (req, res, next) => {
    const qid = ObjectId(req.params.id);
     
    const question = req.body.question;
    const choices = req.body.choices;
    const answer = req.body.answer;
    Question.findByIdAndUpdate(qid, {'question': question, 'choices': choices, 'answer': answer})
        .then(data => {
            res.json(data)
        })
        .catch(next)
});

router.get('/questions/:ownerID/by-quiz', (req, res, next) => {
    const oid = req.params.ownerID;
    Question.find({ownerID: ObjectId(oid) })
    .then(data => {
        res.json(data)
    })
    .catch(next)
})

 router.post('/questions', (req, res, next) => {
     Question.create(req.body)
         .then(data => res.json(data))
         .catch(next)
 });

router.delete('/questions/:id', (req, res, next) => {
     
    Question.findOneAndDelete({'_id': req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

module.exports = router;