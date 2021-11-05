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
    }, []);


    return (
        <body>
            <h1 class='platform-title'>{platform.platformName}</h1>
            <div class='platform'>
                {platform != null ? <img class="platform-banner" src={platform.platformBanner}></img> : <img class="image" src=""></img>}
                {platform != null ? <img class="platform-logo" src={platform.platformLogo}></img> : <img class="image" src=""></img>}
                <Tabs>
                    <TabList style={{position:'relative', top: '0%'}}>
                    <Tab style={{padding: '6px 14%'}}>Quizzes</Tab>
                    <Tab style={{padding: '6px 14%'}}>Leaderboard</Tab>
                    <Tab style={{padding: '6px 14%'}}>About</Tab>
                    </TabList>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        <h2>Quizzes</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        <h2>Leaderboard</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '0%'}}>
                        {platform != null ? <h2>{platform.description}</h2> : <h2></h2>}
                    </TabPanel>
                </Tabs>
            </div>
        </body>
    );
  }

export default PlatformPage;