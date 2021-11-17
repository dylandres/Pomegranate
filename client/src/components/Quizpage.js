import React from 'react'
import '../style/Quizpage.css';
import  { useState, useEffect } from 'react';
import '../style/tabs.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuizPage() {

    const [quiz, setQuiz] = useState({});
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

    const calculateRating = (quiz) => {
        // How many stars to fill
        return ((quiz.totalRating / quiz.totalVotes) / 5) * 328;
    }

    useEffect(() => {
        getQuiz(quizName);
      }, [])
    return (
        <body>
            <h1 className='quiz-title'>{quiz.quizName}</h1>
            <div className='quiz-profile'>
                {quiz.quizBanner !== '' ? <img className="quiz-banner" src={quiz.quizBanner}></img> : <img className="quiz-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                {quiz.quizLogo !== '' ? <img className="quiz-logo" src={quiz.quizLogo}></img> : <img className="quiz-logo" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                Times Taken: {quiz.timesTaken}
                <br/>
                Rating: {(quiz.totalRating / quiz.totalVotes).toFixed(1)}
                {/* <br/>
                Total Rating: {quiz.totalRating}
                <br/>
                Total Votes: {quiz.totalVotes} */}
                <div class="rating">
                <div class="rating-upper" style={{width: `${calculateRating(quiz)}%`}}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span> 
                    <span>★</span>
                    <span>★</span>
                </div>
                <div class="rating-lower">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                </div>
            </div>
                <br/> <br/> <br/>
                <Link to={`/quiztaking/${window.location.href.split('/').pop()}`}> <input type='button' className='take-quiz-button' value='Take Quiz!'></input> </Link>
            </div>
        </body>
    );
  }

export default QuizPage;