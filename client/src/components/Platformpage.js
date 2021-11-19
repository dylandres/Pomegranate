import React from 'react'
import '../style/Platformpage.css';
import '../style/Searchresults.css';
import { useState, useEffect, useReducer, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import UploadImage from './UploadImage.js'
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import zIndex from '@material-ui/core/styles/zIndex';
import { myContext } from '../Context.js';
import DeletePlatform from './DeletePlatform.js';
import CreateQuiz from './CreateQuiz.js';
import { getPlatformLeaderboard } from '../functions.js';


function PlatformPage() {

    const [platform, setPlatform] = useState({});
    const [quizzes, setQuizzes] = useState([]);
    const [subs, setSubs] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [isEditing, setEditing] = useState(false);
    const [isSubbed, setSubbed] = useState(false);
    const [thisDesc, setDesc] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [creating, setCreating] = useState(false);
    const { userObject, setUserObject } = useContext(myContext)
    const [leaderboard, setLeaderboard] = useState({});

    const toggleCreating = () => {
        setCreating(!creating);
    }

    const convertDate = (date) => {
        var newDate = date.substring(0, 10).split('-');
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];
        const newMonth = month[parseInt(newDate[1]) - 1];
        const newDay = newDate[2] < 10 ? newDate[2].substring(1,2) : newDate[2];
        return newMonth + ' ' + newDay + ', ' + newDate[0];
    }
    
    const toggleDeleting = () => {
        setDeleting(!deleting);
    }

    const changeEditing = () => {
        setEditing(!isEditing);
        forceUpdate();
    };

    const subscribe = async () => {
        if (userObject) {
            await axios.put(`/api/users/${userObject._id}/${platform._id}/subscribe`).then(res => res.data);
            await axios.put(`/api/platforms/${platform._id}/${userObject._id}/subscribe`).then(res => res.data);
            setSubbed(!isSubbed);
        }
    }

    const unsubscribe = async () => {
        if (userObject) {
            await axios.put(`/api/users/${userObject._id}/${platform._id}/unsubscribe`).then(res => res.data);
            await axios.put(`/api/platforms/${platform._id}/${userObject._id}/unsubscribe`).then(res => res.data);
            setSubbed(!isSubbed);
        }
    }

    const isSubscribed = (plat) => {
        if (userObject) {
            return plat.subscribers.includes(userObject._id);
        }
    }

    const getResults = (platformName) => {
        return axios.get(`/api/platforms/${platformName}`).then(res => res.data);
    }

    const fillQuizzes = async (platform) => {
        const quizzes = await axios.get(`/api/quizzes`).then(res => res.data);
        //filter out quizzes that don't belong!
        const filtered = quizzes.filter(quiz => platform.quizzes.includes(quiz._id));
        // sort by popularity
        filtered.sort((a, b) => (a.timesTaken > b.timesTaken) ? -1 : 1);
        // array of all even indices
        const evens = filtered.filter((quiz, index) => index % 2 == 0);
        // array of all odd indices
        const odd = filtered.filter((quiz, index) => index % 2 == 1);
        // final array, sorted such that columns are printed in row order
        const finalArray = evens.concat(odd);
        console.log(finalArray);
        if(userObject && (userObject._id !== platform.ownerID)) {
            const finalFinalArray = finalArray.filter((quiz) => quiz.published);
            setQuizzes(finalFinalArray);
            const board = getPlatformLeaderboard(finalFinalArray);
            setLeaderboard(board);
        }
        else {
            setQuizzes(finalArray);
            const board = getPlatformLeaderboard(finalArray);
            setLeaderboard(board);
        }
    }

    const editDesc = async (description) => {
        const task = { desc: description };
        await axios.put(`/api/platforms/${platform._id}/description`, task);
        forceUpdate();
    }

    const newPlatform = async (pName) => {
        const newPlatform = await getResults(pName);
        setPlatform(newPlatform);
        setDesc(newPlatform.description)
        fillQuizzes(newPlatform);
        getSubs(newPlatform);
        setSubbed(isSubscribed(newPlatform));
    }

    const getSubs = async (plat) => {
        if (userObject) {
            const allUsers = await axios.get(`/api/users`).then(res => res.data);
            const filtered = allUsers.filter(thisUser => plat.subscribers.includes(thisUser._id));
            setSubs(filtered);
        }
    }

    var link = window.location.href;
    console.log(link);
    if(link.charAt(link.length - 1) === '/')
        link = link.substring(0, link.length-1)
    console.log(link);
    var platformName = link.split('/').pop();

    useEffect(() => {
        newPlatform(platformName);
    }, [ignored, userObject]);

    let viewMode = {};
    let editMode = {};

    if (isEditing) {
        viewMode.display = "none";
    }
    else {
        editMode.display = "none";
    }

    const handleEditChange = (event) => {
        setDesc(event.target.value);
    }

    return (
        <body>
            <h1 className='platform-title'>{platform.platformName}</h1>
            <div className='platform'>
                {
                    deleting && <DeletePlatform
                        handleClose={toggleDeleting}
                        user={userObject}
                        platform={platform}
                    />
                }
                {
                    creating && <CreateQuiz
                        handleClose={toggleCreating}
                        platform={platform}
                    />
                }
                {
                    userObject ?
                        platform.ownerID === userObject._id ?
                            !isEditing ?
                                <div style={{ position: 'absolute', top: '24.5%', right: '1%', zIndex: 4 }}>
                                    <Button variant="contained" onClick={changeEditing}>Edit</Button>
                                </div>
                                :
                                <span style={{ position: 'absolute', width: '100%', height: '100%' }}>
                                    <div style={{ position: 'absolute', zIndex: 5, top: '1%', left: '11%', display: 'inline-block', overflowY: 'hidden' }}>
                                        <UploadImage imgType='Logo' colType='platforms' uid={platform._id} whichImage='change-logo' state={forceUpdate} />
                                    </div>
                                    <div style={{ position: 'absolute', zIndex: 5, top: '1%', right: '1%', display: 'inline-block', overflowY: 'hidden' }}>
                                        <UploadImage imgType='Banner' colType='platforms' uid={platform._id} whichImage='change-banner' state={forceUpdate} />
                                    </div>
                                    <div style={{ position: 'absolute', top: '23%', right: '1%', zIndex: 6 }}>
                                        <Button variant="contained" onClick={changeEditing}>Stop Editing</Button>
                                    </div>
                                </span>
                            :
                            null
                        :
                        null
                }
                {
                    userObject ?
                        platform.ownerID === userObject._id ?
                            !isEditing ?
                                <div style={{ position: 'absolute', top: '1%', right: '1%', zIndex: 3 }}>
                                    <Button variant="contained" onClick={toggleCreating}>Create Quiz</Button>
                                </div>
                                :
                                null
                            :
                            null
                        :
                        null
                }
                {platform.platformBanner !== '' ? <img className="platform-banner" src={platform.platformBanner}></img> : <img className="platform-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                {platform.platformLogo !== '' ? <img className="platform-logo" src={platform.platformLogo}></img> : <img className="platform-logo" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                {console.log(isSubbed)}
                {console.log(platform)}
                {console.log(userObject)}
                {
                    userObject ?
                        !isSubbed ?
                            <div style={{ position: 'absolute', top: '24.5%', left: '0.5%', zIndex: 4 }}>
                                <Button variant="contained" onClick={subscribe}>Subscribe</Button>
                            </div>
                            :
                            <div style={{ position: 'absolute', top: '24.5%', left: '1%', zIndex: 4 }}>
                                <Button style={{backgroundColor: 'white', color: 'blue'}}variant="contained" onClick={unsubscribe}>Unsubscribe</Button>
                            </div>
                        :
                        null
                }
                <Tabs>
                    <TabList style={{ position: 'relative', top: '0%', width: '98vw', textAlign: 'center' }}>
                        <Tab className='platform-tab react-tabs__tab'>Quizzes</Tab>
                        <Tab className='platform-tab react-tabs__tab'>Leaderboard</Tab>
                        <Tab className='platform-tab react-tabs__tab'>Subscribers</Tab>
                        <Tab className='platform-tab react-tabs__tab'>About</Tab>
                        <Tab className='platform-tab-hidden react-tabs__tab' style={editMode}>Options</Tab>
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
                                                        {quiz.quizLogo !== '' ? <img className="plat-card-image" src={quiz.quizLogo}></img> : <img />}
                                                        <br />
                                                    </div>
                                                    <span className="plat-card-title"><b>{quiz.quizName}</b></span>
                                                    <br />
                                                    <div className="plat-card-content">
                                                        <p>{quiz.summary}</p>
                                                    </div>
                                                    <br />
                                                    Times Taken: {quiz.timesTaken}
                                                    <br />
                                                    {
                                                        userObject ?
                                                            userObject._id === platform.ownerID ?
                                                                quiz.published ?
                                                                    <span>Published</span>
                                                                    :
                                                                    <span>Not Published</span>
                                                                :
                                                                null
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </Link>
                                        </div>
                                    </div>)
                                )}
                            </ul>
                        }
                    </TabPanel>
                    <TabPanel className='lb-tab react-tabs__tab-panel'>
                    <div className="plat-leaderboard">
                        <section id="scrims-ladder--container" class="scrims-ladder">
                            <div class="ladder-nav">
                                <div class="ladder-nav--col ladder-title">
                                    <h1>Platform Leaderboard</h1>
                                </div>
                            </div>
                            {
                            ((Object.keys(leaderboard).length !== 0))
                            ? Object.entries(leaderboard).map( ([player, score], i) =>
                                <Link to={`/profile/${player}`} style = {{textDecoration: 'None'}}> <div class="ladder-nav--results-players">
                                    <div class="results-col">
                                        <span class="results-rank"><span class={i == 0 ? "rank-1" : i == 1 ? "rank-2" : i == 2 ? "rank-3" : "rank"}>{i+1}</span></span>
                                    </div>
                                    <div class="results-col">
                                        <span class="results-gp">{player}</span>
                                    </div>
                                    <div class="results-col">
                                        <span class="results-pts">{score}</span>
                                    </div>
                                </div> </Link>
                            )
                            : <p class="empty-leaderboard">Be the first to take a quiz from this platform!</p>
                            } 
                        </section>
                    </div>
                    </TabPanel>
                    <TabPanel className='quiz-tab react-tabs__tab-panel'>
                        {
                            <ul className="quiz-list">
                                {subs.map(sub => (
                                    <div className="plat-card_container">
                                        <div className="col s12 m7">
                                            <Link to={`/profile/${sub.userName}`} style={{ textDecoration: 'none' }}>
                                                <div className="plat-card">
                                                    <div>
                                                        {sub.profilePicture !== '' ? <img className="plat-card-image" src={sub.profilePicture}></img> : <img className="plat-card-image" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                                                    </div>
                                                    <span className="card-title"><b>{sub.userName} ({sub.fullName})</b></span>
                                                    <br/>
                                                    <div className="plat-card-content">
                                                        <p>{sub.bio}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>)
                                )}
                            </ul>
                        }
                    </TabPanel>
                    <TabPanel className='about-tab react-tabs__tab-panel'>
                        {platform != null ?
                            <div style={{ zIndex: 6, textAlign: 'center', width: '100%', height: '100%' }}>
                                <h2 style={Object.assign({}, viewMode, { position: 'relative', width: '100%'})}>{platform.description}</h2>
                                <TextField variant="outlined" size={thisDesc}
                                    style={Object.assign({}, editMode, { width: '90%', zIndex: 7 })} onChange={handleEditChange}
                                    value={thisDesc} multiline
                                />
                                <br />
                                <Button style={editMode} variant='contained' onClick={() => setDesc(platform.description)}>Cancel Edit</Button>
                                &nbsp;
                                &nbsp;
                                <Button style={editMode} variant='contained' onClick={() => editDesc(thisDesc)}>Confirm Edit</Button>
                                {platform.subscribers != null ? 
                                <h2>Subscriber Count: {platform.subscribers.length}</h2>
                                : null}
                                {platform.createdAt != null ? <h2>Date Created: {convertDate(platform.createdAt)}</h2>:null}
                                
                            </div>
                            :
                            null
                        }
                    </TabPanel>
                    <TabPanel className='options-tab react-tabs__tab-panel' style={editMode}>
                        <div style={{ zIndex: 6, textAlign: 'center', width: '100%', height: '100%' }}>
                            <Button variant='contained' onClick={toggleDeleting}>Delete Platform</Button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </body>
    );
}

export default PlatformPage;