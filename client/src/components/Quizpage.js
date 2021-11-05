import React from 'react'
import '../style/Quizpage.css';
import  { useState, useEffect } from 'react';
import '../style/tabs.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuizPage() {

    const [quiz, setQuiz] = useState(null);
    // Edit mode privilege
    // const [canEdit, setCanEdit] = useState(false);

    const getQuiz = async(quizName) => {
        const thisQuiz = await axios.get(`/api/users/${quizName}/quiz`).then(res => res.data);
        console.log('h1');
        console.log(JSON.stringify(thisQuiz[0]));
        console.log('h2');
        setQuiz(thisQuiz[0]);
    }

    const parse = (url) => {
        var parsed = "";
        for (var i = 0; i < url.length; i++) {
            // interpret %20 as a space character
            if (url[i] == '%') {
                parsed += ' ';
                i += 2;
            }
            else
                parsed += url[i];
        }
        return parsed
    }
    // Get username from url
    const quizName = parse(window.location.href.split('/').pop());

    useEffect(() => {
        getQuiz(quizName);
      }, [])
    return (
        <body>
            <h1 class='title'>Welcome to the {quizName} Quiz Page!</h1>
            <div class='quiz-profile'>
                {quiz != null ? <img class="quiz-banner" src={quiz.quizBanner}></img> : <img class="quiz-banner" src=""></img>}
                {quiz != null ? <img class="quiz-logo" src={quiz.quizLogo}></img> : <img class="quiz-logo" src=""></img>}
                <br/> <br/> <br/>
                <Link to={`/quiztaking/${window.location.href.split('/').pop()}`}> <input type='button' class='take-quiz-button' value='Take Quiz!'></input> </Link>
            </div>
        </body>
    );
  }

export default QuizPage;