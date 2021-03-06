import React from 'react'
import '../style/Quizpage.css';
import { useState, useEffect, useContext } from 'react';
import '../style/tabs.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { myContext } from '../Context.js'
import { getQuizLeaderboard } from '../functions.js';

function QuizPage() {

    const [quiz, setQuiz] = useState({});
    const { userObject, setUserObject } = useContext(myContext)
    const [leaderboard, setLeaderboard] = useState({})
    const [platform, setPlatform] = useState({});
    //Edit mode privilege
    const [canEdit, setCanEdit] = useState(false);
    const [stopwatch, setStopwatch] = useState(0);
    useEffect(() => {
        // Stopwatch mechanism
        setTimeout(() => setStopwatch(stopwatch + 1), 1000);
    });

    const getQuiz = async (quizName) => {
        const thisQuiz = await axios.get(`/api/users/${quizName}/quiz`).then(res => res.data);
        if (thisQuiz.length === 0 || (thisQuiz[0].quizName !== quizName)) {
            setQuiz(null);
            return;
        }
        setQuiz(thisQuiz[0]);
        const thisPlatform = await axios.get(`/api/platforms/by_id/${thisQuiz[0].ownerID}`).then(res => res.data);
        setPlatform(thisPlatform[0]);
        // Get leaderboard information for quiz
        const board = getQuizLeaderboard(thisQuiz[0]);
        setLeaderboard(board);
        if (userObject) {
            setCanEdit(thisPlatform[0].ownerID === userObject._id);
        }
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
    var link = window.location.href;
     
    if (link.charAt(link.length - 1) === '/')
        link = link.substring(0, link.length - 1)
     
    const quizName = parse(link.split('/').pop());

    const calculateRating = (quiz) => {
        // How many stars to fill
        return ((quiz.totalRating / quiz.totalVotes) / 5) * 328;
    }

    useEffect(() => {
        getQuiz(quizName);
    }, [userObject])
    return (
        <body>
            {quiz !== null && Object.keys(quiz).length !== 0 ?
                <h1 className='quiz-title'>{quiz.quizName}</h1>
                : null}
            {quiz !== null && Object.keys(quiz).length !== 0 ?
                <div className='quiz-profile'>
                    {quiz.quizBanner !== '' ? <img className="quiz-banner" src={quiz.quizBanner}></img> : <img className="quiz-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                    {quiz.quizLogo !== '' ? <img className="quiz-logo" src={quiz.quizLogo}></img> : <img className="quiz-logo" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                    <div className="leaderboard">
                        <section id="scrims-ladder--container" class="scrims-ladder">
                            <div class="ladder-nav">
                                <div class="ladder-nav--col ladder-title">
                                    <h1>Quiz Leaderboard</h1>
                                </div>
                            </div>
                            {
                                ((Object.keys(leaderboard).length !== 0))
                                    ? Object.entries(leaderboard).map(([player, score], i) =>
                                        <Link to={`/profile/${player}`} style={{ textDecoration: 'None' }}> <div class="ladder-nav--results-players">
                                            <div class="results-col">
                                                <span class="results-rank"><span class={i == 0 ? "rank-1" : i == 1 ? "rank-2" : i == 2 ? "rank-3" : "rank"}>{i + 1}</span></span>
                                            </div>
                                            <div class="results-col">
                                                <span class="results-gp">{player}</span>
                                            </div>
                                            <div class="results-col">
                                                <span class="results-pts">{numberWithCommas(score)}</span>
                                            </div>
                                        </div> </Link>
                                    )
                                    : <p class="empty-leaderboard">Be the first to take this quiz!</p>
                            }
                        </section>
                    </div>
                    {quiz.totalVotes !== 0 ? 
                    <div class="info">
                        Times Taken: {quiz.timesTaken}
                        <br />
                        Rating: {(quiz.totalRating / quiz.totalVotes).toFixed(1)}
                        <br />
                        <div class="summary">{quiz.summary}</div>
                    </div>
                    :
                    <div class="info">
                        Times Taken: {quiz.timesTaken}
                        <br />
                        Rating: 5.0
                        <br />
                        <div class="summary">{quiz.summary}</div>
                    </div>
                    }
                    <br /> <br /> <br />
                    {
                        quiz.published ?
                            (userObject) ?
                                <Link to={`/quiztaking/${link.split('/').pop()}`}> <input type='button' className='take-quiz-button' value={leaderboard[userObject.userName] ? 'Retake Quiz!' : 'Take Quiz!'}></input> </Link>
                                :
                                <input type='button' className='take-quiz-button' value='Login to Take Quiz!' style={{ fontSize: '14px' }}></input>
                            :
                            null
                    }
                    <Link to={`/platform/${platform.platformName}`}> <input type='button' className='go-platform-button' value='Visit Platform'></input> </Link>
                    {
                        canEdit ?
                            <Link to={`/quizediting/${quizName}`}> <input type='button' className='quizpage-edit-button' value='Edit'></input> </Link>
                            :
                            null
                    }
                </div>
                :
                stopwatch < 2 ?
                    <div className='loader'></div>
                    :
                    <div style={{ position: 'absolute', transform: 'translateX(-50%) translateY(-50%)', left: '50%', top: '50%' }}>Quiz does not exist!</div>
            }
        </body>
    );
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default QuizPage;