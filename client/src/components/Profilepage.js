import React from 'react'
import '../style/Profilepage.css';
import  { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../style/tabs.css';
import axios from 'axios';

function ProfilePage() {

    const [user, setUser] = useState({});
    // Edit mode privilege
    // const [canEdit, setCanEdit] = useState(false);

    const getUser = async(username) => {
        const thisUser = await axios.get(`/api/users/${username}/user`).then(res => res.data);
        console.log('h1');
        console.log(JSON.stringify(thisUser[0].bio));
        console.log('h2');
        setUser(thisUser[0]);
    }

    // Get username from url
    const username = window.location.href.split('/').pop();

    useEffect(() => {
        getUser(username);
      }, [])
    return (
        <body>
            <h1 className='profile-title'>@{username}</h1>
            <h1 className='profile-name'>{user.fullName}</h1>
            <div className='profile'>
                {user.profileBanner !== '' ? <img className="profile-banner" alt='profile banner'src={user.profileBanner}></img> : <img className="profile-banner" alt='profile banner' src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img>}
                {user.profilePicture !== '' ? <img className="profile-logo" alt='profile logo'src={user.profilePicture}></img> : <img className="profile-logo" alt='profile logo' src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                <Tabs>
                    <TabList style={{position:'relative', top: '0%'}}>
                        <Tab style={{padding: '6px 6.5%'}}>Profile</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Owned Platforms</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Quiz History</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Subcriptions</Tab>
                        <Tab style={{padding: '6px 6.5%'}}>Earned Rewards</Tab>
                    </TabList>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        {user != null ? <h2>{user.bio}</h2> : <h2></h2>}
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        <h2>list of owned platforms</h2>
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