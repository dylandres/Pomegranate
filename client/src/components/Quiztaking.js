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

    const quizName = parse(window.location.href.split('/').pop());

    const fillQuestions = async (quizName) => {
        // Get Quiz from db
        const thisQuiz = await axios.get(`/api/quizzes/${quizName}`).then(res => res.data[0]);
        setQuiz(thisQuiz);
        var questionArray = []
        for (var i = 0; i < thisQuiz.questions.length; i++) {
            const question = thisQuiz.questions[i];
            const questionData = await axios.get(`/api/questions/${question}`).then(res => res.data[0]);
            questionArray.push(questionData);
        }
        setQuestions(questionArray);
    }


    useEffect(() => {
        fillQuestions(quizName);
      }, [])

    return (
        <body>
        <br/><br/>
            <h1 className='title'>quiz taking page for {quizName}</h1>
            <ul>
            {questions.map(question => (
                <div>
                    <b>{question.question}</b>
                    <br/>
                    <button>{question.choices[0]}</button>
                    <br/>
                    <button>{question.choices[1]}</button>
                    <br/>
                    <button>{question.choices[2]}</button>
                    <br/>
                    <button>{question.choices[3]}</button>
                    <br/>
                    <br/>
                </div>
            ))}
            </ul>
            {/* {platforms.map(platform => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                <Link to={`/platform/${platform.platformName}`} style={{ textDecoration: 'none' }}>
                                    <div className="card">
                                        <div>
                                            <img className="search-card-image" src={platform.platformLogo}></img><br />
                                        </div> */}
                               
        </body>
    );
  }

export default QuizTaking;