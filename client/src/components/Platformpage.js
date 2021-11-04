import React from 'react'
import '../style/Platformpage.css';
import  { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
import '../style/tabs.css';

function PlatformPage() {
    // Get username from url
    const username = window.location.href.split('/').pop();
    return (
        <body>
            <h1 class='title'>Welcome to {username}'s profile page!</h1>
            <div class='profile'>
                <Tabs>
                    <TabList style={{position:'relative', top: '70%'}}>
                        <Tab style={{padding: '6px 6%'}}>Profile</Tab>
                        <Tab style={{padding: '6px 6%'}}>Owned Platforms</Tab>
                        <Tab style={{padding: '6px 6%'}}>Quiz History</Tab>
                        <Tab style={{padding: '6px 6%'}}>Subcriptions</Tab>
                        <Tab style={{padding: '6px 6%'}}>Earned Rewards</Tab>
                    </TabList>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>profile info</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>list of owned platforms</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>list of quizzes</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>list of subscriptions</h2>
                    </TabPanel>
                    <TabPanel style={{position:'relative', top: '70%'}}>
                        <h2>list of rewards</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </body>
    );
  }

export default PlatformPage;