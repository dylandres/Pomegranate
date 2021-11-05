import React from 'react'
import '../style/Dashboard.css';
import  { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'

function DashBoard() {

    const [popularQuizzes, setPopularQuizzes] = useState([])

    const fillPopularQuizzes = async() => {
        const quizzes = await axios.get(`/api/quizpages`).then(res => res.data);
        // sort by popularity
        quizzes.sort((a, b) => (a.timesTaken > b.timesTaken) ? -1 : 1);
        // take top 2 quizzes
        setPopularQuizzes([quizzes[0], quizzes[1]]);
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
                    <TabPanel>
                    {
                    <ul className="popular-quizzes">
                        {popularQuizzes.map(quiz => (
                            <Link to={`/quizpage/${quiz.quizName}`} style={{ textDecoration: 'none' }}>
                            <div className="card_container">
                                <div className="col s12 m7">
                                <div className="card">
                                    <div>
                                    <img className="dash-card-image" src={quiz.quizLogo}></img><br/>
                                    </div>
                                    <span className="card-title"><b>{quiz.quizName}</b></span>
                                    <div className="card-content">
                                    <p>{quiz.summary}</p>
                                    </div>
                                    <div className="card-action">
                                    <a href={`/quizpage/${quiz.quizName}`}>Take {quiz.quizName} Quiz!</a>
                                    </div>
                                    Times Taken: {quiz.timesTaken}
                                </div>
                                </div>
                            </div></Link>
                        )
                        )}
                    </ul>
                    }
                    </TabPanel>
                    <TabPanel>
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
