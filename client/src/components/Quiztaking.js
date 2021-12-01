import React from 'react'
import '../style/Quiztaking.css';
import { useState, useEffect, useContext } from 'react';
import '../style/tabs.css';
import { parse } from '../functions.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getQuizLeaderboard, formatTime } from '../functions.js';
import { myContext } from '../Context.js'
import { YearPicker } from '@mui/lab';

function QuizTaking() {

    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [correct, setCorrect] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [numCorrect, setNumCorrect] = useState(0);
    const [displayFeedback, toggleDisplayFeedback] = useState(-1);
    const [stopwatch, setStopwatch] = useState(0);
    const [rating, setRating] = useState(0);
    const [leaderboard, setLeaderboard] = useState({});
    const { userObject, setUserObject } = useContext(myContext);
    const [quizScore, setQuizScore] = useState(0);

    var link = window.location.href;
    console.log(link);
    if (link.charAt(link.length - 1) === '/')
        link = link.substring(0, link.length - 1)
    console.log(link);
    const quizName = parse(link.split('/').pop());

    const fillQuestions = async (quizName) => {
        // Get Quiz from db
        const thisQuiz = await axios.get(`/api/quizzes/${quizName}`).then(res => res.data[0]);
        setQuiz(thisQuiz);
        // Get all questions from this quiz
        if (thisQuiz.questions != null) {
            var questionArray = []
            var correctArray = []
            for (var i = 0; i < thisQuiz.questions.length; i++) {
                const question = thisQuiz.questions[i];
                const questionData = await axios.get(`/api/questions/${question}`).then(res => res.data[0]);
                questionArray.push(questionData);
                correctArray.push(-1);
            }
            setQuestions(questionArray);
            setCorrect(correctArray);
        }
        // Get leaderboard information for quiz
        const board = getQuizLeaderboard(thisQuiz);
        setLeaderboard(board);
    }

    function sleep(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const processChoice = async (choice, isCorrect) => {
        toggleDisplayFeedback(choice); // display feedback
        await sleep(1000); // 1 sec delay
        toggleDisplayFeedback(-1);
        if (isCorrect) {
            setNumCorrect(numCorrect + 1); // +1 correct
            var newCorrectArray = [...correct];
            newCorrectArray[questionIndex] = 1;
            setCorrect(newCorrectArray);
        }        
        else {
            var newCorrectArray = [...correct];
            newCorrectArray[questionIndex] = 0;
            setCorrect(newCorrectArray);
        }
        setQuestionIndex(questionIndex + 1); // next question
    }

    const goToEndOfQuiz = async () => {
        await sleep(1000);
        setQuestionIndex(questionIndex + 1);
        await axios.put(`/api/quizzes/${quiz._id}/incrementNumTaken`).then(res => res.data);
        // Update leaderboard if necessary
        // const oldScore = leaderboard[userObject.userName];
        // // User took this quiz before
        // if (oldScore) {
        //     // High-score
        //     if (quizScore > oldScore) {
        //         await axios.put(`/api/quizzes/add_to_leaderboard/${quiz._id}/${userObject.userName}/${quizScore}`).then(res => res.data);
        //     }
        // }
        // // User's first time taking quiz
        // else {
        //     await axios.put(`/api/quizzes/add_to_leaderboard/${quiz._id}/${userObject.userName}/${quizScore}`).then(res => res.data);
        // }
        // Only put user's first score on leaderboard
        if (!leaderboard[userObject.userName]) {
            await axios.put(`/api/quizzes/add_to_leaderboard/${quiz._id}/${userObject.userName}/${quizScore}`).then(res => res.data);
        }
        // Add to user's quiz history
        const timestamp = Date.now();
        await axios.put(`/api/users/quiz_history/${quiz.quizName}/${userObject._id}/${quizScore}/${timestamp}`).then(res => res.data);
    }

    const submitRating = async () => {
        await axios.put(`/api/quizzes/${quiz._id}/rate/${rating}`).then(res => res.data);;
        setRating(-1);
    }

    const calculateScore = () => {
        setQuizScore(((((numCorrect / questions.length) * 10000) / stopwatch) * 100).toFixed(0));
    }

    useEffect(() => {
        fillQuestions(quizName);
    }, [])

    useEffect(() => {
        // Stopwatch mechanism
        if (questionIndex > -1 && questionIndex < questions.length) {
            setTimeout(() => setStopwatch(stopwatch + 1), 1000);
            calculateScore();
        }
    });

    useEffect(() => {
        // Quiz results "page"
        if (questionIndex == questions.length) {
            goToEndOfQuiz();
        }
    }, [questionIndex]);

    return (
        <body>
            <br />
            {
                questions.length > 0 ?
                    questionIndex == -1 ?
                        <div style={{position: 'absolute', top: '30%', width: '100%', height: 'auto', textAlign: 'center'}}>
                            <img src={quiz.quizLogo} style={{width: '10%', height: '10%'}}></img>
                            <h1 className='title'>{quizName}</h1>
                            <h2>Number of Questions: {questions.length}</h2>
                            <button class='start-button' onClick={() => setQuestionIndex(questionIndex + 1)}>Start!</button>
                        </div>
                        :

                        questionIndex < questions.length ?

                            <ul class="question">

                                <div style={{ position: 'absolute', right: '2%', top: '-5%' }}>{formatTime(stopwatch)}</div>
                                <div style={{ position: 'absolute', left: '3%', top: '-40%', fontSize: '72px'}}>{questionIndex + 1}</div>
                                <div style={{position: 'absolute', left: '1%', top:'10vh', backgroundColor: 'white',
                                 height: '70vh', width: '7%', overflowY: 'scroll', borderRadius: '15px', borderColor: 'rgb(236, 68, 124)',
                                 borderStyle: 'solid', borderWidth: '3px'}}>
                                    {
                                        correct.map((check, i) => (
                                            <div style={{height: '5%', width: '90%'}}>
                                                <div style={{position: 'relative', float: 'left'}}>{i+1}</div>
                                                {
                                                    check == -1 ?
                                                        null
                                                        :
                                                        check == 0 ?
                                                            <span style={{position: 'absolute', right: '10%', color: 'red'}}>X</span>
                                                            :
                                                            <span style={{position: 'absolute', right: '8%', color: 'green'}}>✓</span>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div class="question-text">
                                    <div class='question-inner'>
                                        <b style={{ whiteSpace: 'pre-wrap', display: 'inline-block', textAlign: 'left', height: '100%', verticalAlign: 'middle' }}>{questions[questionIndex].question}</b>
                                        <br />
                                        {questions[questionIndex].image !== '' ? <img className="question-image" src={questions[questionIndex].image}></img> : null}
                                    </div>
                                </div>
                                <div className='choice-list'>
                                    {
                                        (displayFeedback == -1)
                                            // Display choices
                                            ? questions[questionIndex].choices.map(function (choice, i) {
                                                if (questions[questionIndex].answer == i) {
                                                    return <div class={"choice"}><button id={i} class="answer" onClick={() => processChoice(i, true)}>{choice}</button><br /></div>
                                                }
                                                else {
                                                    return <div class={"choice"}><button id={i} class="answer" onClick={() => processChoice(i, false)}>{choice}</button><br /></div>
                                                }
                                            })
                                            // Display feedback (right and wrong answers) after choice is picked
                                            : questions[questionIndex].choices.map(function (choice, i) {
                                                if (questions[questionIndex].answer == i) {
                                                    return <div class={"choice"}><button id={i} class="disabled-answer" style={{ backgroundColor: "lightgreen" }}>{choice}</button><br /></div>
                                                }
                                                else {
                                                    return <div class={"choice"}><button id={i} class="disabled-answer" style={{ backgroundColor: "red" }}>{choice}</button><br /></div>
                                                }
                                            })
                                    }
                                </div>
                                <br />
                                {displayFeedback == -1 ? <Link to={`/quizpage/${quizName}`}><button style={{ backgroundColor: "red", position: 'absolute', top: '80vh', right: '2%' }}>Quit Quiz</button></Link> : null}
                            </ul>
                            :
                            questionIndex == questions.length
                                ? <div class="end-of-quiz">
                                    <br></br><br></br>
                                    Processing results...
                                </div>
                                : <div class="end-of-quiz">
                                    <br></br><br></br>
                                    End of the quiz!
                                    <br></br><br></br>
                                    You got {numCorrect}/{questions.length} correct!
                                    <br></br><br></br>
                                    Time Taken: {formatTime(stopwatch)}
                                    <br></br><br></br>
                                    Score: {quizScore}
                                    <br></br><br></br>
                                    {/* <Link to={`/quizpage/${quizName}`}><button class='back-button'>BACK</button></Link> */}
                                    {
                                        rating != -1
                                            ? <div>
                                                <div class="rate">
                                                    <input onClick={() => setRating(5)} type="radio" id="star5" name="rate" value="5" />
                                                    <label for="star5" title="text">5 stars</label>
                                                    <input onClick={() => setRating(4)} type="radio" id="star4" name="rate" value="4" />
                                                    <label for="star4" title="text">4 stars</label>
                                                    <input onClick={() => setRating(3)} type="radio" id="star3" name="rate" value="3" />
                                                    <label for="star3" title="text">3 stars</label>
                                                    <input onClick={() => setRating(2)} type="radio" id="star2" name="rate" value="2" />
                                                    <label for="star2" title="text">2 stars</label>
                                                    <input onClick={() => setRating(1)} type="radio" id="star1" name="rate" value="1" />
                                                    <label for="star1" title="text">1 star</label>
                                                </div>
                                                <br></br><br></br>
                                                <Link to={`/quizpage/${quizName}`}><button onClick={() => submitRating()} class="submit-rating">Submit Rating</button></Link>
                                            </div>
                                            : <p>Rating received!</p>
                                    }
                                </div>
                    :
                        <div className='loader'></div>
            }
        </body>
    );
}

export default QuizTaking;