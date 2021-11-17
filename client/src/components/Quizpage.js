import React from 'react'
import '../style/Quizpage.css';
import  { useState, useEffect, useContext } from 'react';
import '../style/tabs.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { myContext } from '../Context.js'
import { sortLeaderboard } from '../functions.js';

function QuizPage() {

    const [quiz, setQuiz] = useState({});
    const {userObject, setUserObject} = useContext(myContext)
    const [leaderboard, setLeaderboard] = useState({})
    // Edit mode privilege
    // const [canEdit, setCanEdit] = useState(false);

    const getQuiz = async(quizName) => {
        const thisQuiz = await axios.get(`/api/users/${quizName}/quiz`).then(res => res.data);
        setQuiz(thisQuiz[0]);
        // Get leaderboard information for quiz
        const board = sortLeaderboard(thisQuiz[0]);
        setLeaderboard(board);
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
                <div className="leaderboard">
                Leaderboard
                <br></br>
                {
                Object.entries(leaderboard).map( ([player, score], i) => 
                    <p>
                        {i+1}: {player}: {score}
                    </p>
                )}
                </div>
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
                {
                (userObject) ? 
                <Link to={`/quiztaking/${window.location.href.split('/').pop()}`}> <input type='button' className='take-quiz-button' value='Take Quiz!'></input> </Link>
                : <p>Login to take quizzes!</p>
                }
            </div>
        </body>
    );
  }

export default QuizPage;