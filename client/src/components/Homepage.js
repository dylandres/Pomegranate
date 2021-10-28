import React from 'react'
import './Homepage.css';
import  { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';

function HomePage() {

    return (
        <body>
            <div class='feed'>
                <Tabs>
                    <TabList>
                        <Tab>Popular Quizzes</Tab>
                        <Tab>For You</Tab>
                    </TabList>
                    <TabPanel>
                        <h2>item 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>item 1</h2>
                    </TabPanel>
                </Tabs>
            </div>
            <div class='subscriptions'>
                <div class='subscriptions_header'>subscriptions</div>
            </div>
        </body>
    );
  }

export default HomePage;