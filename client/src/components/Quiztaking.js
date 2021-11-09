import React from 'react'
import '../style/Quiztaking.css';
import  { useState, useEffect } from 'react';
import '../style/tabs.css';
import { Link } from 'react-router-dom';
import { parse } from '../functions.js';
import axios from 'axios';

function QuizTaking() {

    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    // -1: quiz not started, 0: ques 1, 1: ques 2, n: ques n+1
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [numCorrect, setNumCorrect] = useState(0);

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

    useEffect(() => {
        fillQuestions(quizName);
      }, [])

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const correct = async (e) => {
        e.target.style.backgroundColor = 'lightgreen';
        await timeout(1000); // 1 sec delay to display feed back (correct)
        e.target.style.backgroundColor = 'white';
        setQuestionIndex(questionIndex + 1)
        setNumCorrect(numCorrect + 1);
    }

    const incorrect = async (e) => {
        e.target.style.backgroundColor = 'red';
        await timeout(1000); // 1 sec delay to display feed back (incorrect)
        e.target.style.backgroundColor = 'white';
        setQuestionIndex(questionIndex + 1)
    }

    return (
        <body>
        <br/><br/>
            {
                questionIndex == -1 ?
                <div>
                    <h1 className='title'>{quizName}</h1>
                    {/* <h2>questionIndex: {questionIndex}</h2> */}
                    <h2>length: {questions.length} questions</h2>
                    <h2>time limit: 5 min</h2>
                    <button class='start-button' onClick={() => setQuestionIndex(questionIndex + 1)}>Ready!</button>
                </div>
                :
                questionIndex == questions.length ?
                <div class="end-of-quiz">
                    End of the quiz!
                    You got {numCorrect}/{questions.length} correct!
                </div>
                :
                <ul class="question">
                    {/* questionIndex: {questionIndex} */}
                    <div>
                        <b>{questions[questionIndex].question}</b>
                        <br/>
                        {   questions[questionIndex].answer == 0 
                            ? <button onClick = {(e) => correct(e)} class="correct-answer">{questions[questionIndex].choices[0]} correct</button>
                            : <button onClick = {(e) => incorrect(e)} class="incorrect-answer">{questions[questionIndex].choices[0]} incorrect</button>
                        }
                        <br/>
                        {   questions[questionIndex].answer == 1
                            ? <button onClick = {(e) => correct(e)} class="correct-answer">{questions[questionIndex].choices[1]} correct</button>
                            : <button onClick = {(e) => incorrect(e)} class="incorrect-answer">{questions[questionIndex].choices[1]} incorrect</button>
                        }
                        <br/>
                        {   questions[questionIndex].answer == 2
                            ? <button onClick = {(e) => correct(e)} class="correct-answer">{questions[questionIndex].choices[2]} correct</button>
                            : <button onClick = {(e) => incorrect(e)} class="incorrect-answer">{questions[questionIndex].choices[2]} incorrect</button>
                        }
                        <br/>
                        {   questions[questionIndex].answer == 3 
                            ? <button onClick = {(e) => correct(e)} class="correct-answer">{questions[questionIndex].choices[3]} correct</button>
                            : <button onClick = {(e) => incorrect(e)} class="incorrect-answer">{questions[questionIndex].choices[3]} incorrect</button>
                        }
                        <br/>
                        <br/>
                    <Link to={`/quizpage/${quizName}`}>Quit Quiz</Link>
                    </div>
                </ul>
            }       
        </body>
    );
  }

export default QuizTaking;