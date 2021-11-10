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
    // -1: quiz not started, 0: ques 1, 1: ques 2, n: ques n+1
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [numCorrect, setNumCorrect] = useState(0);
    const [displayFeedback, setDisplayFeedback] = useState(-1);
    const [stopwatch, setStopwatch] = useState(0);

    const quizName = parse(window.location.href.split('/').pop());

    const fillQuestions = async (quizName) => {
        // Get Quiz from db
        const thisQuiz = await axios.get(`/api/quizzes/${quizName}`).then(res => res.data[0]);
        setQuiz(thisQuiz);
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

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const processChoice = async (choice, isCorrect) => {
        setDisplayFeedback(choice); // display feedback
        await timeout(1000); // 1 sec delay
        setDisplayFeedback(-1);
        if (isCorrect)
            setNumCorrect(numCorrect+1); // +1 correct
        setQuestionIndex(questionIndex + 1); // next question
    }

    const goToEndOfQuiz = async () => {
        await timeout(1000);
        setQuestionIndex(questionIndex + 1);
    }

    const formatTime = () => {
        var time = new Date(stopwatch * 1000).toISOString().substr(14, 5);
        return time;
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
        if (questionIndex == questions.length)
            goToEndOfQuiz();
    });

    return (
        <body>
        <br/><br/>
            {
                questionIndex == -1 ?
                <div>
                    <h1 className='title'>{quizName}</h1>
                    <h2>length: {questions.length} questions</h2>
                    <h2>time limit: 5 min</h2>
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
                                    return <div><button id={i} class="answer" onClick={() => processChoice(i, true)}>{choice} correct</button><br/></div>
                                }
                                else {
                                    return <div><button id={i} class="answer" onClick={() => processChoice(i, false)}>{choice} incorrect</button><br/></div>
                                }
                            })
                            // Display feedback (right and wrong answers) after choice is picked
                            : questions[questionIndex].choices.map(function(choice, i) {
                                if (questions[questionIndex].answer == i) {
                                    return <div><button id={i} class="disabled-answer" style={{backgroundColor: "lightgreen"}}>{choice} correct</button><br/></div>
                                }
                                else {
                                    return <div><button id={i} class="disabled-answer" style={{backgroundColor: "red"}}>{choice} incorrect</button><br/></div>
                                }
                            })
                        }
                    <Link to={`/quizpage/${quizName}`}><button style={{backgroundColor: "red"}}>Quit Quiz</button></Link>
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
                </div>
            }       
        </body>
    );
  }

export default QuizTaking;