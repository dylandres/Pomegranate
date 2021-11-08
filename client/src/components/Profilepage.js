import React from 'react'
import '../style/Profilepage.css';
import  { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';

function ProfilePage() {

    const [profile, setProfile] = useState({});
    const [user, setUser] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    // Edit mode privilege
    // const [canEdit, setCanEdit] = useState(false);

    const getProfile = async(username) => {
        const thisProfile = await axios.get(`/api/users/${username}/user`).then(res => res.data);
        setProfile(thisProfile[0]);
        getUser(thisProfile[0]);
        return thisProfile;
    }

    const getUser = async(thisProfile) => {
        const thisUser = await axios.get(`/api/users/${thisProfile._id}`).then(res => res.data);
        console.log(thisUser);
        setUser(thisUser);
        getPlatforms(thisUser);
        return thisUser;
    }

    const getPlatforms = async(thisUser) => {
        const allPlatforms = await axios.get(`/api/platforms/${thisUser._id}/profile`).then(res => res.data);
        console.log(allPlatforms);
        setPlatforms(allPlatforms);
    }

    // Get username from url
    const username = window.location.href.split('/').pop();

    useEffect(() => {
        getProfile(username);
      }, [])
    return (
        <body>
            <h1 className='profile-title'>@{username}</h1>
            <h1 className='profile-name'>{profile.fullName}</h1>
            <div className='profile'>
                {profile.profileBanner !== '' ? <img className="profile-banner" src={profile.profileBanner}></img> : <img className="profile-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                {profile.profilePicture !== '' ? <img className="profile-logo" src={profile.profilePicture}></img> : <img className="profile-logo" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                <Tabs>
                    <TabList style={{position:'relative', top: '0%'}}>
                        <Tab style={{padding: '6px 6.5%'}}>Profile</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Owned Platforms</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Quiz History</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Subcriptions</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Earned Rewards</Tab>
                    </TabList>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        {profile != null ? <h2>{profile.bio}</h2> : <h2></h2>}
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
                                                    <div className="prof-card-action">
                                                        <a href={`/platform/${platform.platformName}`}>Visit {platform.platformName}!</a>
                                                    </div>
                                                    
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