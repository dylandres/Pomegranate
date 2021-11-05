import React from 'react'
import '../style/Dashboard.css';
import  { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'

function DashBoard() {

    const [popularQuizzes, setPopularQuizzes] = useState([])

    const fillPopularQuizzes = async() => {
        const quizzes = await axios.get(`/api/quizpages`).then(res => res.data);
        // sort by popularity
        quizzes.sort((a, b) => (a.timesTaken > b.timesTaken) ? -1 : 1);
        // take top 2 quizzes
        setPopularQuizzes([quizzes[0], quizzes[1]]);
    }

    useEffect(() => {
        fillPopularQuizzes();
        // fillForYou();
      }, [])

    return (
        <body>
            <div class='feed'>
                <Tabs>
                    <TabList>
                        <Tab>Popular Quizzes</Tab>
                        <Tab>For You</Tab>
                    </TabList>
                    <TabPanel>
                    {
                    <ul className="popular-quizzes">
                        {popularQuizzes.map(quiz => (
                            <div class="card_container">
                                <div class="col s12 m7">
                                <div class="card">
                                    <div class="card-image">
                                    <img src={logo}></img><br/>
                                    </div>
                                    <span class="card-title"><b>{quiz.quizName}</b></span>
                                    <div class="card-content">
                                    <p>{quiz.summary}</p>
                                    </div>
                                    <div class="card-action">
                                    <a href="#">Visit {quiz.quizName}!</a>
                                    </div>
                                    Times Taken: {quiz.timesTaken}
                                </div>
                                </div>
                            </div>
                        )
                        )}
                    </ul>
                    }
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