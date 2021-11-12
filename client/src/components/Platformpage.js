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

function PlatformPage() {

    const [platform, setPlatform] = useState({});
    const [quizzes, setQuizzes] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [isEditing, setEditing] = useState(false);
    const [isSubbed, setSubbed] = useState(false);
    const [thisDesc, setDesc] = useState('');
    const [deleting, setDeleting] = useState(false);
    const { userObject, setUserObject } = useContext(myContext)

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
        setQuizzes(finalArray);
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
        setSubbed(isSubscribed(newPlatform));
    }

    var platformName = window.location.href.split('/').pop();

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
                    userObject ?
                        platform.ownerID === userObject._id ?
                            !isEditing ?
                                <div style={{ position: 'absolute', top: '24.5%', right: '1%', zIndex: 4 }}>
                                    <Button variant="contained" onClick={changeEditing}>Edit</Button>
                                </div>
                                :
                                <span style={{ position: 'absolute', width: '100%', height: '100%' }}>
                                    <div style={{ position: 'absolute', zIndex: 3, top: '1%', left: '11%', display: 'inline-block', overflowY: 'hidden' }}>
                                        <UploadImage imgType='Logo' colType='platforms' uid={platform._id} whichImage='change-logo' state={forceUpdate} />
                                    </div>
                                    <div style={{ position: 'absolute', zIndex: 3, top: '1%', right: '1%', display: 'inline-block', overflowY: 'hidden' }}>
                                        <UploadImage imgType='Banner' colType='platforms' uid={platform._id} whichImage='change-banner' state={forceUpdate} />
                                    </div>
                                    <div style={{ position: 'absolute', top: '23%', right: '1%', zIndex: 4 }}>
                                        <Button variant="contained" onClick={changeEditing}>Stop Editing</Button>
                                    </div>
                                </span>
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
                            <div style={{ position: 'absolute', top: '24.5%', left: '0.5%', zIndex: 4 }}>
                                <Button variant="contained" onClick={unsubscribe}>Unsubscribe</Button>
                            </div>
                        :
                        null
                }
                <Tabs>
                    <TabList style={{ position: 'relative', top: '0%', width: '98vw', textAlign: 'center' }}>
                        <Tab className='platform-tab react-tabs__tab'>Quizzes</Tab>
                        <Tab className='platform-tab react-tabs__tab'>Leaderboard</Tab>
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
                        {platform != null ?
                            <div style={{ zIndex: 6, textAlign: 'center', width: '100%', height: '100%' }}>
                                <h2 style={viewMode} >{platform.description}</h2>
                                <TextField variant="outlined" size={thisDesc}
                                    style={Object.assign({}, editMode, { width: '90%', zIndex: 7 })} onChange={handleEditChange}
                                    value={thisDesc}
                                />
                                <br />
                                <Button style={editMode} variant='contained' onClick={() => setDesc(platform.description)}>Cancel Edit</Button>
                                &nbsp;
                                &nbsp;
                                <Button style={editMode} variant='contained' onClick={() => editDesc(thisDesc)}>Confirm Edit</Button>
                            </div>
                            :
                            <h2></h2>
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