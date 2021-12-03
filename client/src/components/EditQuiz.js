import React from 'react'
import '../style/Profilepage.css';
import '../style/Platformpage.css';
import '../style/EditQuiz.css';
import { useState, useEffect, useReducer, useContext, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import '../style/tabs.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import zIndex from '@material-ui/core/styles/zIndex';
import UploadImage from './UploadImage.js';
import EditQuestion from './EditQuestion.js';
import DeleteQuiz from './DeleteQuiz.js';
import CreatePlatform from './CreatePlatform.js';
import { myContext } from '../Context.js';
import { keyframes } from '@material-ui/styled-engine';
import { sizeHeight } from '@material-ui/system';

function EditQuiz() {
    const [summary, setSummary] = useState('')
    const [questions, setQuestions] = useState([])
    const [newQuestions, setNewQuestions] = useState([])
    const [quiz, setQuiz] = useState(null)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [canEdit, setCanEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [published, setPublished] = useState(false);
    const { userObject, setUserObject } = useContext(myContext);
    const divEndRef = useRef(null)

    const toggleDeleting = () => {
        setDeleting(!deleting);
    }

    const togglePublished = async () => {
        const task = {};
        if(published) {
            task.published = false
            setPublished(false);
        }
        else {
            task.published = true
            setPublished(true);
        }
        await axios.put(`/api/quizzes/${quiz._id}/published`, task);
    }

    const scrollToBottom = () => {
        divEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    var link = window.location.href;
    console.log(link);
    if(link.charAt(link.length - 1) === '/')
        link = link.substring(0, link.length-1)
    console.log(link);
    const quizName = link.split('/').pop();

    const insertNewQuestion = () => {
        const newQuestion = {
            ownerID: quiz._id,
            quizName: quiz.quizName,
            question: '',
            image: '',
            choices: [],
            answer: 0
        }
        setNewQuestions([...newQuestions, newQuestion]);
    };

    const confirmAboutEdits = async () => {
        const task = { summary: summary };
        console.log(task);
        await axios.put(`/api/quizzes/${quiz._id}/summary`, task);
        forceUpdate();
    }

    const getQuiz = async (quizName) => {
        const thisQuiz = await axios.get(`/api/users/${quizName}/quiz`).then(res => res.data);
        setQuiz(thisQuiz[0]);
        setSummary(thisQuiz[0].summary);
        fillQuestions(thisQuiz[0]);
        setNewQuestions([]);
        setEditing(thisQuiz[0]);
        setPublished(thisQuiz[0].published);
    }

    const handleEditSummaryChange = (event) => {
        setSummary(event.target.value);
    }

    const fillQuestions = async (quiz) => {
        const questions = await axios.get(`/api/questions/${quiz._id}/by-quiz`).then(res => res.data);
        console.log(questions);
        setQuestions(questions);
    }

    const setEditing = async (quiz) => {
        const thisPlatform = await axios.get(`/api/platforms/by_id/${quiz.ownerID}`).then(res => res.data);
        console.log(userObject);
        console.log(thisPlatform);
        if (userObject) {
            setCanEdit(thisPlatform[0].ownerID === userObject._id);
        }
    }

    const newDelete = () => {
        setNewQuestions([]);
    }

    useEffect(() => {
        getQuiz(quizName)
    }, [quizName, ignored, userObject]);

    useEffect(() => {
        if (newQuestions.length > 0)
            scrollToBottom()
    }, [newQuestions]);

    return (
        <body>
            <div className='quiz'>
                {
                    deleting && <DeleteQuiz
                        handleClose={toggleDeleting}
                        quiz={quiz}
                    />
                }
                {
                    canEdit ?
                        quiz != null ?
                            <span style={{ position: 'absolute', width: '100%', height: '100%' }}>
                                <div style={{ position: 'absolute', zIndex: 4, top: '1%', left: '11%', display: 'inline-block' }}>
                                    <UploadImage imgType='Logo' colType='quizzes' uid={quiz._id} whichImage='change-logo' state={forceUpdate} />
                                </div>
                                <div style={{ position: 'absolute', zIndex: 4, top: '1%', right: '1%', display: 'inline-block' }}>
                                    <UploadImage imgType='Banner' colType='quizzes' uid={quiz._id} whichImage='change-banner' state={forceUpdate} />
                                </div>
                            </span>
                            :
                            null
                        :
                        null
                }
                {quiz ? quiz.quizBanner !== '' ? <img className="quizEdit-banner" src={quiz.quizBanner}></img> : <img className="quizEdit-banner" src="https://pomegranate-io.s3.amazonaws.com/1200px-Black_flag.svg.png"></img> : null}
                {quiz ? quiz.quizLogo !== '' ? <img className="quizEdit-logo" src={quiz.quizLogo}></img> : <img className="quizEdit-logo" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img> : null}
                {
                    userObject ?
                        canEdit ?
                            <Tabs>
                                <TabList style={{ position: 'relative', top: '0%', width: '98vw', textAlign: 'center' }}>
                                    <Tab className='profile-tab react-tabs__tab'>About Quiz</Tab>
                                    <Tab className='profile-tab react-tabs__tab'>Questions</Tab>
                                    <Tab className='profile-tab react-tabs__tab'>Options</Tab>
                                </TabList>
                                <TabPanel style={{ position: 'relative', top: '0%' }}>
                                    {quiz != null ?
                                        <div style={{ zIndex: '5', textAlign: 'center', width: '100%', height: '100%', zIndex: 6 }}>
                                            <h2>{quiz.quizName}</h2>
                                            <TextField variant="outlined" label="Summary"
                                                style={{ width: '90%', zIndex: 6 }} onChange={handleEditSummaryChange}
                                                value={summary} multiline
                                            />
                                            <br />
                                            <Button variant='contained' onClick={confirmAboutEdits}>Confirm Edits</Button>
                                        </div>
                                        :
                                        <h2></h2>
                                    }

                                </TabPanel>
                                <TabPanel style={{ position: 'relative', top: '0%', textAlign: 'center', overflowY: 'scroll', height: '115%', zIndex: 7 }}>
                                    <div style={{ height: '90%', overflowY: 'scroll' }}>
                                        <ul className="question-list">
                                            {
                                                questions.map(question => (
                                                    <div className="prof-card_container">
                                                        <div className="col s12 m7">
                                                            <EditQuestion prop_question={question} exists={true} state={forceUpdate} newDelete={newDelete} />
                                                        </div>
                                                        <br />
                                                        <br />
                                                    </div>
                                                ))
                                            }
                                        </ul>
                                        <ul className="question-list">
                                            {
                                                newQuestions.map(question => (
                                                    <div className="prof-card_container">
                                                        <div ref={divEndRef} className="col s12 m7">
                                                            <EditQuestion prop_question={question} exists={false} state={forceUpdate} newDelete={newDelete} />
                                                        </div>
                                                        <br />
                                                        <br />
                                                    </div>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div style={{ height: 'auto', position: 'sticky', bottom: '0%' }}>
                                        {
                                            newQuestions.length === 0 ?
                                                <Button variant='contained' size='large' onClick={() => {
                                                    insertNewQuestion();
                                                }}>Add New Question</Button>
                                                :
                                                <Button variant='contained' size='large' disabled>Add New Question</Button>
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel className='options-tab react-tabs__tab-panel'>
                                    <div style={{ zIndex: 6, textAlign: 'center', width: '100%', height: 'auto' }}>
                                        <Button variant='contained' onClick={toggleDeleting}>Delete Quiz</Button>
                                    </div>
                                    <br/>
                                    <div style={{ zIndex: 6, textAlign: 'center', width: '100%', height: 'auto '}}>
                                        {
                                            published ?
                                                <Button variant='contained' onClick={togglePublished}>Unpublish Quiz</Button>
                                                :
                                                <Button variant='contained' onClick={togglePublished}>Publish Quiz</Button>
                                        }
                                    </div>
                                </TabPanel>
                            </Tabs>
                            :
                            <div style={{ textAlign: 'center' }}>You Cannot Edit This Page</div>
                        :
                        <div style={{ textAlign: 'center' }}>Loading...</div>
                }
            </div>

        </body>
    )
}

export default EditQuiz;