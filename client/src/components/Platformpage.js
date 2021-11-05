import React from 'react'
import '../style/Platformpage.css';
import  { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';

function PlatformPage() {

    const [platform, setPlatform] = useState({});
    
    const getResults = (platformName) => {
        return axios.get(`/api/platforms/${platformName}`).then(res => res.data);
    }
    
    const newProfile = async(pName) => {
        const newPlatform = await getResults(pName);
        setPlatform(newPlatform);
        console.log(platform);
    }

    var platformName = window.location.href.split('/').pop();

    useEffect(() => {
        newProfile(platformName);
        console.log(platform);
    }, [platformName]);


    return (
        <body>
            <h1 class='title'>Welcome to {platform.platformName}!</h1>
            <div class='profile'>
                <img src={platform.platformLogo} className='platform-logo'/>
                <img src={platform.platformBanner} className='platform-banner'/>
                <Tabs>
                    <TabList style={{position:'relative', top: '70%'}}>
                        <Tab style={{padding: '6px 6%'}}>Quizzes</Tab>
                        <Tab style={{padding: '6px 6%'}}>Leaderboard</Tab>
                        <Tab style={{padding: '6px 6%'}}>About</Tab>
                    </TabList>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>Quizzes</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>Leaderboard</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>About platform</h2>
                        <p>{platform.description}</p>
                    </TabPanel>
                </Tabs>
            </div>
        </body>
    );
  }

export default PlatformPage;