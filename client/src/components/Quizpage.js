import React from 'react'
import '../style/Quizpage.css';
import  { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../style/tabs.css';
import axios from 'axios';

function QuizPage() {

    // const [quiz, setQuiz] = useState(null);
    // // Edit mode privilege
    // // const [canEdit, setCanEdit] = useState(false);

    // const getQuiz = async(quizName) => {
    //     const thisQuiz = await axios.get(`/api/users/${quizName}/quiz`).then(res => res.data);
    //     console.log('h1');
    //     console.log(JSON.stringify(thisUser[0].bio));
    //     console.log('h2');
    //     setUser(thisUser[0]);
    // }

    // // Get username from url
    // const username = window.location.href.split('/').pop();

    // useEffect(() => {
    //     getUser(username);
    //   }, [])
    // return (
    //     <body>
    //         <h1 class='title'>Welcome to {username}'s profile page!</h1>
    //         <div class='profile'>
    //             {user != null ? <img class="profile-banner" src={user.profileBanner}></img> : <img class="image" src=""></img>}
    //             {user != null ? <img class="profile-logo" src={user.profilePicture}></img> : <img class="image" src=""></img>}
    //             <Tabs>
    //                 <TabList style={{position:'relative', top: '0%'}}>
    //                     <Tab style={{padding: '6px 7%'}}>Profile</Tab>
    //                     <Tab style={{padding: '6px 7%'}}>Owned Platforms</Tab>
    //                     <Tab style={{padding: '6px 7%'}}>Quiz History</Tab>
    //                     <Tab style={{padding: '6px 7%'}}>Subcriptions</Tab>
    //                     <Tab style={{padding: '6px 7%'}}>Earned Rewards</Tab>
    //                 </TabList>
    //                 <TabPanel style={{position:'relative', top: '0%'}}>
    //                     {user != null ? <h2>{user.bio}</h2> : <h2></h2>}
    //                 </TabPanel>
    //                 <TabPanel style={{position:'relative', top: '0%'}}>
    //                     <h2>list of owned platforms</h2>
    //                 </TabPanel>
    //                 <TabPanel style={{position:'relative', top: '0%'}}>
    //                     <h2>list of quizzes</h2>
    //                 </TabPanel>
    //                 <TabPanel style={{position:'relative', top: '0%'}}>
    //                     <h2>list of subscriptions</h2>
    //                 </TabPanel>
    //                 <TabPanel style={{position:'relative', top: '0%'}}>
    //                     <h2>list of rewards</h2>
    //                 </TabPanel>
    //             </Tabs>
    //         </div>
    //     </body>
    //);
  }

export default QuizPage;