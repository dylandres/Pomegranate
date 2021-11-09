import React from 'react'
import '../style/Platformpage.css';
import '../style/Searchresults.css';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'

function PlatformPage() {

    const [platform, setPlatform] = useState({});
    const [quizzes, setQuizzes] = useState([]);

    const getResults = (platformName) => {
        return axios.get(`/api/platforms/${platformName}`).then(res => res.data);
    }

    const fillQuizzes = async (platform) => {
        const quizzes = await axios.get(`/api/quizzes`).then(res => res.data);
        //filter out quizzes that don't belong!
        console.log(quizzes);
        const filtered = quizzes.filter(quiz => platform.quizzes.includes(quiz._id));
        // sort by popularity
        filtered.sort((a, b) => (a.timesTaken > b.timesTaken) ? -1 : 1);
        // array of all even indices
        const evens = filtered.filter((quiz, index) => index % 2 == 0);
        // array of all odd indices
        const odd = filtered.filter((quiz, index) => index % 2 == 1);
        // final array, sorted such that columns are printed in row order
        const finalArray = evens.concat(odd);
        setQuizzes(finalArray);
    }

    const newProfile = async (pName) => {
        const newPlatform = await getResults(pName);
        setPlatform(newPlatform);
        fillQuizzes(newPlatform);
        console.log(platform);
    }

    var platformName = window.location.href.split('/').pop();

    useEffect(() => {
        newProfile(platformName);
        console.log(platform);
    }, []);


    return (
        <body>
            <h1 className='platform-title'>{platform.platformName}</h1>
            <div className='platform'>
                {platform.platformBanner !== '' ? <img className="platform-banner" src={platform.platformBanner}></img> : <img className="platform-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                {platform.platformLogo !== '' ? <img className="platform-logo" src={platform.platformLogo}></img> : <img className="platform-logo" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                <Tabs>
                    <TabList style={{ position: 'relative', top: '0%' }}>
                        <Tab style={{ padding: '6px 14%' }}>Quizzes</Tab>
                        <Tab style={{ padding: '6px 14%' }}>Leaderboard</Tab>
                        <Tab style={{ padding: '6px 14%' }}>About</Tab>
                    </TabList>
                    <TabPanel className="quiz-tab react-tabs__tab-panel">
                        {
                            <ul className="quiz-list">
                                {quizzes.map(quiz => (
                                    <div className="plat-card_container">
                                        <div className="col s12 m7">
                                            <Link to={`/quizpage/${quiz.quizName}`} style={{ textDecoration: 'none' }}>
                                                <div className="plat-card" >
                                                    <div>
                                                        {quiz.quizLogo !== '' ? <img className="plat-card-image" src={quiz.quizLogo}></img>:<img/>}
                                                        <br/>
                                                    </div>
                                                    <span className="plat-card-title"><b>{quiz.quizName}</b></span>
                                                    <br/>
                                                    <div className="plat-card-content">
                                                        <p>{quiz.summary}</p>
                                                    </div>
                                                    <br/>
                                                    Times Taken: {quiz.timesTaken}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>)
                                )}
                            </ul>
                        }
                    </TabPanel>
                    <TabPanel className='lb-tab react-tabs__tab-panel'>
                        <h2 style={{ textAlign: 'center' }}>Leaderboard</h2>
                    </TabPanel>
                    <TabPanel className='about-tab react-tabs__tab-panel'>
                        {platform != null ? <h2 style={{ textAlign: 'center' }}>{platform.description}</h2> : <h2></h2>}
                    </TabPanel>
                </Tabs>
            </div>
        </body>
    );
}

export default PlatformPage;