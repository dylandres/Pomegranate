import React from 'react'
import '../style/Profilepage.css';
import  { useState, useEffect, useReducer } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import zIndex from '@material-ui/core/styles/zIndex';
import UploadImage from './UploadImage.js'

function ProfilePage() {

    const [profile, setProfile] = useState({});
    const [platforms, setPlatforms] = useState([]); 
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [isEditing, setEditing] = useState(false);
    const [isOwner, setOwner] = useState(false);
    const [thisBio, setBio] = useState('');
    // Edit mode privilege
    // const [canEdit, setCanEdit] = useState(false);

    const changeEditing = () => {
        setEditing(!isEditing);
        forceUpdate();
    };

    const getProfile = async(username) => {
        const thisProfile = await axios.get(`/api/users/${username}/user`).then(res => res.data);
        setProfile(thisProfile[0]);
        setBio(thisProfile[0].bio);
        getPlatforms(thisProfile[0]);
        return thisProfile;
    }

    const getPlatforms = async(thisUser) => {
        const allPlatforms = await axios.get(`/api/platforms/${thisUser._id}/profile`).then(res => res.data);
        console.log(allPlatforms);
        setPlatforms(allPlatforms);
    }

    const editBio = async (biography) => {
        const task = {bio: biography};
        await axios.put(`/api/users/${profile._id}/bio`, task);
        forceUpdate();
    }

    // Get username from url
    const username = window.location.href.split('/').pop();

    useEffect(() => {
        getProfile(username);
        
      }, [ignored])

      let viewMode = {};
    let editMode = {};

    if(isEditing) {
        viewMode.display="none";
    }
    else {
        editMode.display="none";
    }

    const handleEditChange = (event) => {
        setBio(event.target.value);
    }
      
    return (
        <body>
            <h1 className='profile-title'>@{username}</h1>
            <h1 className='profile-name'>{profile.fullName}</h1>
            <div className='profile'>
            {
                !isEditing ? 
                <div style={{position:'absolute', top: '23%', right: '1%', zIndex: 4}}>
                    <Button variant="contained" onClick={changeEditing}>Edit</Button>
                </div> 
                :
                <span style ={{position: 'absolute', width: '100%', height: '100%'}}> 
                    <div style={{ position: 'absolute', zIndex: 4, top: '1%', left: '11%', display: 'inline-block' }}>
                        <UploadImage imgType = 'Picture' colType='users' uid={profile._id} whichImage='change-pic' state = {forceUpdate}/>
                    </div>
                    <div style={{ position: 'absolute', zIndex: 4, top: '1%', right: '1%', display: 'inline-block' }}>
                        <UploadImage imgType = 'Banner' colType='users' uid={profile._id} whichImage='change-banner' state = {forceUpdate}/>
                    </div>
                    <div style={{position:'absolute', top: '23%', right: '1%', zIndex: 4}}>
                    <Button variant="contained" onClick={changeEditing}>Stop Editing</Button>
                    </div> 
                </span>
                }
                {profile.profileBanner !== '' ? <img className="profile-banner" src={profile.profileBanner}></img> : <img className="profile-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                {profile.profilePicture !== '' ? <img className="profile-logo" src={profile.profilePicture}></img> : <img className="profile-logo" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                <Tabs>
                    <TabList style={{position:'relative', top: '0%', width: '98vw'}}>
                        <Tab className = 'profile-tab react-tabs__tab'>Profile</Tab>
                        <Tab className = 'profile-tab react-tabs__tab'>Owned Platforms</Tab>
                        <Tab className = 'profile-tab react-tabs__tab'>Quiz History</Tab>
                        <Tab className = 'profile-tab react-tabs__tab'>Subscriptions</Tab>
                        <Tab className = 'profile-tab react-tabs__tab'>Earned Rewards</Tab>
                    </TabList>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                    {profile != null ? 
                        <div style={{zIndex:'5', textAlign: 'center', width: '100%', height: '100%'}}>
                            <h2 style={viewMode} >{profile.bio}</h2> 
                            <TextField variant="outlined" size={thisBio}
                            style={Object.assign({}, editMode, {width: '90%'})} onChange={handleEditChange}
                            value = {thisBio}
                            />
                            <br/>
                            <Button style={editMode} variant='contained' onClick = {() => setBio(profile.bio)}>Cancel Edit</Button>
                            &nbsp;
                            &nbsp;
                            <Button style={editMode} variant='contained' onClick = {() => editBio(thisBio)}>Confirm Edit</Button>
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
                                                        {platform.platformLogo !== '' ? <img className="prof-card-image" src={platform.platformLogo}></img>:<img/>}
                                                        <br/>
                                                    </div>
                                                    <span className="prof-card-title"><b>{platform.platformName}</b></span>
                                                    <br/>
                                                    <div className="prof-card-content">
                                                        <p>{platform.description}</p>
                                                    
                                                    </div>
                                                    <br/>
                                                    
                                                    
                                                </div>
                                            </Link>
                                        </div>
                                    </div>)
                                )}
                            </ul>
                        }
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        <h2>list of quizzes</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        <h2>list of subscriptions</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        <h2>list of rewards</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </body>
    );
  }

export default ProfilePage;