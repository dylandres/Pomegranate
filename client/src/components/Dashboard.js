import React from 'react'
import '../style/Dashboard.css';
import  { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../style/tabs.css';

function DashBoard() {

    return (
        <body>
            <div class='feed'>
                <Tabs>
                    <TabList>
                        <Tab>Popular Quizzes</Tab>
                        <Tab>For You</Tab>
                    </TabList>
                    <TabPanel>
                        <h2>list of quizzes</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>list of quizzes (subscribed)</h2>
                    </TabPanel>
                </Tabs>
            </div>
            <div class='subscriptions'>
                <div class='subscriptions_header'>subscriptions</div>
                platform card
            </div>
        </body>
    );
  }

export default DashBoard;