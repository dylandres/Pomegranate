import React from 'react'
import '../style/Dashboard.css';
import { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'
import { myContext } from '../Context.js'

function DashBoard() {

    const [popularQuizzes, setPopularQuizzes] = useState([])
    const [subbed, setSubbed] = useState([])
    const {userObject, setUserObject} = useContext(myContext)

    const fillPopularQuizzes = async () => {
        const quizzes = await axios.get(`/api/quizzes`).then(res => res.data);
        // sort by popularity
        quizzes.sort((a, b) => (a.timesTaken > b.timesTaken) ? -1 : 1);
        // take top 2 quizzes
        setPopularQuizzes([quizzes[0], quizzes[1], quizzes[3], quizzes[4], quizzes[5]]);
    }

    const fillSubbed = async () => {
        if (userObject) {
            const platforms = await axios.get(`/api/platforms`).then(res => res.data);
            const filtered = platforms.filter(plat => plat.subscribers.includes(userObject._id));
            setSubbed(filtered);
        }
    }

    useEffect(() => {
        fillPopularQuizzes();
        fillSubbed();
    }, [userObject])

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
                                                        {quiz.quizLogo !== '' ? <img className="sub-card-image" src={quiz.quizLogo}></img>:<img className="sub-card-image" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
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
                {
                            <ul className="popular-quizzes">
                                {subbed.map(plat => (
                                    <div className="sub-card-container">
                                        <div className="col s12 m7">
                                            <Link to={`/platform/${plat.platformName}`} style={{ textDecoration: 'none' }}>
                                                <div className="sub-card">
                                                    <div>
                                                        {plat.platformLogo !== '' ? <img className="dash-card-image" src={plat.platformLogo}></img>:<img className="dash-card-image" src={"https://pomegranate-io.s3.amazonaws.com/pomegranate.png"}></img>}
                                                        <br/>
                                                    </div>
                                                    <span className="sub-card-title"><b>{plat.platformName}</b></span>
                                                    <br/>
                                                    <div className="sub-card-content">
                                                        <p>{plat.description}</p>
                                                    </div>
                                                    <br/>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                                )}
                            </ul>
                        }
            </div>
        </body>
    );
}

export default DashBoard;
