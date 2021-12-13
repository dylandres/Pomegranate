import React from 'react'
import '../style/Profilepage.css';
import { useState, useEffect, useReducer, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AwardRow from './AwardRow.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import zIndex from '@material-ui/core/styles/zIndex';
import UploadImage from './UploadImage.js';
import CreatePlatform from './CreatePlatform.js';
import { myContext } from '../Context.js';

function ProfilePage() {

    const [profile, setProfile] = useState({});
    const [platforms, setPlatforms] = useState([]);
    const [awards, setAwards] = useState([])
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [isEditing, setEditing] = useState(false);
    const [thisBio, setBio] = useState('');
    const { userObject, setUserObject } = useContext(myContext)
    const [creating, setCreating] = useState(false);
    const [subs, setSubs] = useState([]);
    const [quizHistory, setQuizHistory] = useState([]);
    const [stopwatch, setStopwatch] = useState(0);

    useEffect(() => {
        // Stopwatch mechanism
            setTimeout(() => setStopwatch(stopwatch + 1), 1000);
    });

    const toggleCreating = () => {
        setCreating(!creating);
    }

    const changeEditing = () => {
        setEditing(!isEditing);
        forceUpdate();
    };

    const getProfile = async (username) => {
        const thisProfile = await axios.get(`/api/users/${username}/user`).then(res => res.data)
        
        if (thisProfile.length === 0 || (thisProfile[0].userName !== username)) {
            setProfile(null);
            return;
        }
        await axios.put(`/api/awards/${thisProfile[0]._id}`)
        var awards = await axios.get(`/api/awards/${thisProfile[0]._id}`).then(res => res.data)

        setAwards(groupAwards(awards))
        setProfile(thisProfile[0]);
        if (userObject && (thisProfile[0]._id === userObject._id))
            setUserObject(thisProfile[0]);
        setBio(thisProfile[0].bio);
        getPlatforms(thisProfile[0]);
        getSubs(thisProfile[0]);
        fillQuizHistory(thisProfile[0]);
        return thisProfile;
    }

    const groupAwards = (awardArr) => {
        var index = 0;
        var arrayLength = awardArr.length;
        var tempArray = [];

        for (index = 0; index < arrayLength; index += 3) {
            var threeAwards = awardArr.slice(index, index + 3);
            tempArray.push(threeAwards);
        }

        return tempArray;
    }

    const getPlatforms = async (thisUser) => {
        const allPlatforms = await axios.get(`/api/platforms/${thisUser._id}/profile`).then(res => res.data);
        console.log(allPlatforms);
        setPlatforms(allPlatforms);
    }

    const getSubs = async (thisUser) => {
        const platforms = await axios.get(`/api/platforms`).then(res => res.data);
        const filtered = platforms.filter(plat => plat.subscribers.includes(thisUser._id));
        setSubs(filtered);
    }

    const editBio = async (biography) => {
        const task = { bio: biography };
        await axios.put(`/api/users/${profile._id}/bio`, task);
        forceUpdate();
    }

    const fillQuizHistory = async (thisUser) => {
        var history = []
        console.log("getting history");
        for (const quiz of thisUser.quizHistory) {
            console.log(quiz);
            const logo = await axios.get(`/api/quizzes/${quiz.quiz}`).then(res => res.data[0]);
            if (logo)
                history.push([quiz, logo.quizLogo]);
        }
        console.log(history);
        setQuizHistory(history);
    }

    // Get username from url
    var link = window.location.href;
    console.log(link);
    if (link.charAt(link.length - 1) === '/')
        link = link.substring(0, link.length - 1)
    console.log(link);
    const username = link.split('/').pop();

    useEffect(() => {
        getProfile(username);

    }, [ignored, username])

    let viewMode = {};
    let editMode = {};

    if (isEditing) {
        viewMode.display = "none";
    }
    else {
        editMode.display = "none";
    }

    const handleEditChange = (event) => {
        setBio(event.target.value);
    }

    return (
        <body>
            
            {profile !== null && Object.keys(profile).length !== 0 ?
                <h1 className='profile-title'>@{username}</h1>
                : null}
            {profile !== null && Object.keys(profile).length !== 0 ?
                <h1 className='profile-name'>{profile.fullName}</h1>
                : null}
            {profile !== null && Object.keys(profile).length !== 0 ?
                <div className='profile'>
                    {
                        creating && <CreatePlatform
                            handleClose={toggleCreating}
                            user={userObject}
                        />
                    }
                    {console.log(profile)}
                    {console.log(userObject)}
                    {
                        userObject ?
                            profile._id === userObject._id ?
                                !isEditing ?
                                    <div style={{ position: 'absolute', top: '23%', right: '1%', zIndex: 4 }}>
                                        <Button variant="contained" onClick={changeEditing}>Edit</Button>
                                    </div>
                                    :
                                    <span style={{ position: 'absolute', width: '100%', height: '100%' }}>
                                        <div style={{ position: 'absolute', zIndex: 4, top: '1%', left: '11%', display: 'inline-block' }}>
                                            <UploadImage imgType='Picture' colType='users' uid={profile._id} whichImage='change-pic' state={forceUpdate} />
                                        </div>
                                        <div style={{ position: 'absolute', zIndex: 4, top: '1%', right: '1%', display: 'inline-block' }}>
                                            <UploadImage imgType='Banner' colType='users' uid={profile._id} whichImage='change-banner' state={forceUpdate} />
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
                    {
                        userObject ?
                            profile._id === userObject._id ?
                                !isEditing ?
                                    <div style={{ position: 'absolute', top: '1%', right: '1%', zIndex: 3 }}>
                                        <Button variant="contained" onClick={toggleCreating}>Create Platform</Button>
                                    </div>
                                    :
                                    null
                                :
                                null
                            :
                            null
                    }
                    {console.log(creating)}
                    {profile.profileBanner !== '' ? <img className="profile-banner" src={profile.profileBanner}></img> : <img className="profile-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                    {profile.profilePicture !== '' ? <img className="profile-logo" src={profile.profilePicture}></img> : <img className="profile-logo" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                    <Tabs>
                        <TabList style={{ position: 'relative', top: '0%', width: '98vw', textAlign: 'center' }}>
                            <Tab className='profile-tab react-tabs__tab'>Profile</Tab>
                            <Tab className='profile-tab react-tabs__tab'>Owned Platforms</Tab>
                            <Tab className='profile-tab react-tabs__tab'>Quiz History</Tab>
                            <Tab className='profile-tab react-tabs__tab'>Subscriptions</Tab>
                            <Tab className='profile-tab react-tabs__tab'>Earned Rewards</Tab>
                        </TabList>
                        <TabPanel style={{ position: 'relative', top: '0%' }}>
                            {profile != null ?
                                <div style={{ zIndex: '5', textAlign: 'center', width: '100%', height: '100%', zIndex: 6 }}>
                                    <h2 style={viewMode} >{profile.bio}</h2>
                                    <TextField variant="outlined"
                                        style={Object.assign({}, editMode, { width: '90%', zIndex: 6 })} onChange={handleEditChange}
                                        value={thisBio} multiline
                                    />
                                    <br />
                                    <Button style={editMode} variant='contained' onClick={() => setBio(profile.bio)}>Cancel Edit</Button>
                                    &nbsp;
                                    &nbsp;
                                    <Button style={editMode} variant='contained' onClick={() => editBio(thisBio)}>Confirm Edit</Button>
                                </div>
                                :
                                <h2></h2>
                            }
                        </TabPanel>
                        <TabPanel className="plat-tab react-tabs__tab-panel">
                            {
                                <ul className="plat-list">
                                    {platforms.map(platform => (
                                        <div className="prof-card_container">
                                            <div className="col s12 m7">
                                                <Link to={`/platform/${platform.platformName}`} style={{ textDecoration: 'none' }}>
                                                    <div className="prof-card" >
                                                        <div>
                                                            {platform.platformLogo !== '' ? <img className="prof-card-image" src={platform.platformLogo}></img> : <img />}
                                                            <br />
                                                        </div>
                                                        <span className="prof-card-title"><b>{platform.platformName}</b></span>
                                                        <br />
                                                        <div className="prof-card-content">
                                                            <p>{platform.description}</p>
                                                        </div>
                                                        <br />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>)
                                    )}
                                </ul>
                            }
                        </TabPanel>
                        <TabPanel className="history-tab react-tabs__tab-panel">
                            {
                                (quizHistory.length) ?
                                    quizHistory.map(quiz => (
                                        <div className="history-card_container">
                                            <div className="col s12 m7">
                                                <Link to={`/quizpage/${quiz[0].quiz}`} style={{ textDecoration: 'none' }}>
                                                    <div className="history-card" >
                                                        <div>
                                                            {quiz[1] !== '' ? <img className="prof-card-image" src={quiz[1]}></img> : <img className="prof-card-image" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                                                            <br />
                                                        </div>
                                                        <span className="history-card-title"><b>{quiz[0].quiz}</b></span>
                                                        <br />
                                                        <div className="history-card-content">
                                                            <p>Score: {quiz[0].score} ({Date(quiz[0].timestamp).substring(4, 15)})</p>
                                                        </div>
                                                        <br />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                    : <p><b>{profile.userName} hasn't taken any quizzes yet!</b></p>
                            }
                        </TabPanel>
                        <TabPanel className="plat-tab react-tabs__tab-panel">
                            {
                                <ul className="plat-list">
                                    {subs.map(platform => (
                                        <div className="prof-card_container">
                                            <div className="col s12 m7">
                                                <Link to={`/platform/${platform.platformName}`} style={{ textDecoration: 'none' }}>
                                                    <div className="prof-card" >
                                                        <div>
                                                            {platform.platformLogo !== '' ? <img className="prof-card-image" src={platform.platformLogo}></img> : <img />}
                                                            <br />
                                                        </div>
                                                        <span className="prof-card-title"><b>{platform.platformName}</b></span>
                                                        <br />
                                                        <div className="prof-card-content">
                                                            <p>{platform.description}</p>
                                                        </div>
                                                        <br />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>)
                                    )}
                                </ul>
                            }
                        </TabPanel>
                        <TabPanel className="plat-tab react-tabs__tab-panel">
                            {awards.length > 0 ?
                                awards.map(threeAwards => (
                                    <AwardRow awards={threeAwards} />
                                ))
                                // no awards found
                                : <b>You have no rewards! Take some quizzes, or create a platform and quizzes to earn badges.</b>}
                        </TabPanel>
                    </Tabs>
                </div>
                : stopwatch < 2 ? 
                    <div className='loader'></div>
                    :
                    <div style={{position: 'absolute', transform: 'translateX(-50%) translateY(-50%)', left: '50%', top: '50%'}}>Profile does not exist!</div>
                }
        </body>
    );
}

export default ProfilePage;