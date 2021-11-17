import React from 'react'
import '../style/Quiztaking.css';
import  { useState, useEffect } from 'react';
import '../style/tabs.css';
import { parse } from '../functions.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuizTaking() {

    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [numCorrect, setNumCorrect] = useState(0);
    const [displayFeedback, toggleDisplayFeedback] = useState(-1);
    const [stopwatch, setStopwatch] = useState(0);
    const [rating, setRating] = useState(0);

    const quizName = parse(window.location.href.split('/').pop());

    const fillQuestions = async (quizName) => {
        // Get Quiz from db
        const thisQuiz = await axios.get(`/api/quizzes/${quizName}`).then(res => res.data[0]);
        setQuiz(thisQuiz);
        // Get all questions from this quiz
        if (thisQuiz.questions != null) {
            var questionArray = []
            for (var i = 0; i < thisQuiz.questions.length; i++) {
                const question = thisQuiz.questions[i];
                const questionData = await axios.get(`/api/questions/${question}`).then(res => res.data[0]);
                questionArray.push(questionData);
            }
            setQuestions(questionArray);
        }
    }

    function sleep(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const processChoice = async (choice, isCorrect) => {
        toggleDisplayFeedback(choice); // display feedback
        await sleep(1000); // 1 sec delay
        toggleDisplayFeedback(-1);
        if (isCorrect)
            setNumCorrect(numCorrect+1); // +1 correct
        setQuestionIndex(questionIndex + 1); // next question
    }

    const goToEndOfQuiz = async () => {
        await sleep(1000);
        setQuestionIndex(questionIndex + 1);
        await axios.put(`/api/quizzes/${quiz._id}/incrementNumTaken`).then(res => res.data);
    }

    const formatTime = () => {
        var time = new Date(stopwatch * 1000).toISOString().substr(14, 5);
        return time;
    }

    const submitRating = async () => {
        await axios.put(`/api/quizzes/${quiz._id}/rate/${rating}`).then(res => res.data);;
        setRating(-1);
    }

    useEffect(() => {
        fillQuestions(quizName);
      }, [])

    useEffect(() => {
        // Stopwatch mechanism
        if (questionIndex > -1 && questionIndex < questions.length)
            setTimeout(() => setStopwatch(stopwatch + 1), 1000);  
    });

    useEffect(() => {
        // Quiz results "page"
        if (questionIndex == questions.length) {
            goToEndOfQuiz();
        }
    }, [questionIndex]);

    return (
        <body>
        <br/><br/>
            {
                questionIndex == -1 ?
                <div>
                    <h1 className='title'>{quizName}</h1>
                    <h2>length: {questions.length} questions</h2>
                    <button class='start-button' onClick={() => setQuestionIndex(questionIndex + 1)}>Ready!</button>
                </div>
                :
                
                questionIndex < questions.length ?

                <ul class="question">
                    {formatTime()}
                    <div>
                        <b>{questions[questionIndex].question}</b>
                        {
                            (displayFeedback == -1)
                            // Display choices
                            ? questions[questionIndex].choices.map(function(choice, i) {
                                if (questions[questionIndex].answer == i) {
                                    return <div><button id={i} class="answer" onClick={() => processChoice(i, true)}>{choice}</button><br/></div>
                                }
                                else {
                                    return <div><button id={i} class="answer" onClick={() => processChoice(i, false)}>{choice}</button><br/></div>
                                }
                            })
                            // Display feedback (right and wrong answers) after choice is picked
                            : questions[questionIndex].choices.map(function(choice, i) {
                                if (questions[questionIndex].answer == i) {
                                    return <div><button id={i} class="disabled-answer" style={{backgroundColor: "lightgreen"}}>{choice}</button><br/></div>
                                }
                                else {
                                    return <div><button id={i} class="disabled-answer" style={{backgroundColor: "red"}}>{choice}</button><br/></div>
                                }
                            })
                        }
                        {displayFeedback == -1 ? <Link to={`/quizpage/${quizName}`}><button style={{backgroundColor: "red"}}>Quit Quiz</button></Link> : null}
                    </div>
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
                    Time Taken: {formatTime()}
                    <br></br><br></br>
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
                            <button onClick={() => submitRating()} class="submit-rating">Submit Rating</button>
                        </div>
                    : <p>Rating received!</p>
                    }
                </div>
            }       
        </body>
    );
  }

export default QuizTaking;