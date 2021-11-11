import React from 'react'
import '../style/Dashboard.css';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'

function DashBoard() {

    const [popularQuizzes, setPopularQuizzes] = useState([])

    const fillPopularQuizzes = async () => {
        const quizzes = await axios.get(`/api/quizzes`).then(res => res.data);
        // sort by popularity
        quizzes.sort((a, b) => (a.timesTaken > b.timesTaken) ? -1 : 1);
        // take top 2 quizzes
        setPopularQuizzes([quizzes[0], quizzes[1], quizzes[3], quizzes[4], quizzes[5]]);
    }

    useEffect(() => {
        fillPopularQuizzes();
        // fillForYou();
    }, [])

    return (
        <body>
            <div className='feed'>
                <Tabs>
                    <TabList>
                        <Tab>Popular Quizzes</Tab>
                        <Tab>For You</Tab>
                    </TabList>
                    <TabPanel className="popular-quiz-tab">
                        {
                            <ul className="popular-quizzes">
                                {popularQuizzes.map(quiz => (
                                    <div className="card_container">
                                        <div className="col s12 m7">
                                            <Link to={`/quizpage/${quiz.quizName}`} style={{ textDecoration: 'none' }}>
                                                <div className="card">
                                                    <div>
                                                        {quiz.quizLogo !== '' ? <img className="dash-card-image" src={quiz.quizLogo}></img>:<img className="dash-card-image" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                                                        <br/>
                                                    </div>
                                                    <span className="card-title"><b>{quiz.quizName}</b></span>
                                                    <div className="card-content">
                                                        <p>{quiz.summary}</p>
                                                    </div>
                                                    <br/>
                                                    Times Taken: {quiz.timesTaken}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                                )}
                            </ul>
                        }
                    </TabPanel>
                    <TabPanel className="for-you-tab">
                        <h2>list of quizzes (subscribed)</h2>
                    </TabPanel>
                </Tabs>
            </div>
            <div className='subscriptions'>
                <div className='subscriptions_header'>subscriptions</div>
                platform card
            </div>
        </body>
    );
}

export default DashBoard;
