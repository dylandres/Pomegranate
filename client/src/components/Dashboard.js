import React from 'react'
import '../style/Dashboard.css';
import { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'
import { myContext } from '../Context.js'
import { dateFromObjectId } from '../functions.js';

function DashBoard() {

    const [popularQuizzes, setPopularQuizzes] = useState([])
    const [subbed, setSubbed] = useState([])
    const [forYou, setForYou] = useState([])
    const {userObject, setUserObject} = useContext(myContext)

    const fillPopularQuizzes = async () => {
        const quizzes = await axios.get(`/api/quizzes`).then(res => res.data);
        // sort by popularity
        quizzes.sort((a, b) => (a.timesTaken > b.timesTaken) ? -1 : 1);
        // take top 2 quizzes
        setPopularQuizzes([quizzes[0], quizzes[1], quizzes[3], quizzes[4], quizzes[5]]);
    }

    const fillSubbedAndForYou = async () => {
        if (userObject) {
            const platforms = await axios.get(`/api/platforms`).then(res => res.data);
            const filtered = platforms.filter(plat => plat.subscribers.includes(userObject._id));
            setSubbed(filtered);
            // For each subscribed platform, get all quizzes
            var quizzes = []
            for (const platform of filtered) {
                for (const quiz_id of platform.quizzes) {
                    const quiz = await axios.get(`/api/quizzes/by_id/${quiz_id}`).then(res => res.data);
                    console.log(quiz[0])
                    console.log(dateFromObjectId(quiz[0]._id));
                    quizzes.push(quiz[0]);
                }
            }
            // Sort by descending date
            quizzes = quizzes.sort((a, b) => dateFromObjectId(b._id) - dateFromObjectId(a._id))
            // Take the 10 most recent
            quizzes = quizzes.slice(0, 10);
            setForYou(quizzes);
        }
    }

    useEffect(() => {
        fillPopularQuizzes();
        fillSubbedAndForYou();
    }, [userObject])

    return (
        <body>
            <div className='feed'>
                <Tabs>
                    <TabList>
                        <Tab>Popular Quizzes</Tab>
                        <Tab>For You</Tab>
                    </TabList>
                    <TabPanel className="popular-quiz-tab react-tabs__tab-panel">
                        {
                            <ul className="popular-quizzes ">
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
                    <TabPanel className="for-you-tab react-tabs__tab-panel">
                        {
                            (userObject) ?
                            <ul className="popular-quizzes ">
                                {forYou.map(quiz => (
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
                                                    Date Created: {dateFromObjectId(quiz._id).toString().substr(0, 15)}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                                )}
                            </ul>
                            : <p>Login to view personalized content!</p>
                        }
                    </TabPanel>
                </Tabs>
            </div>
            <div className='subscriptions'>
                <div className='subscriptions_header'>subscriptions</div>
                {
                    (userObject) ?
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
                    : <p>Login to view subscriptions!</p>
                }
            </div>
        </body>
    );
}

export default DashBoard;
