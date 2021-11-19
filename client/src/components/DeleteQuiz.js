import React from 'react'
import '../style/DeletePlatform.css';
import { useState, useEffect, useReducer, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation, Link } from 'react-router-dom';
import UploadImage from './UploadImage.js'
import '../style/tabs.css';
import axios from 'axios';
import logo from './images/pomegranate.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function DeleteQuiz(props) {

    const [verify, setVerify] = useState('');

    const handleVerity = (event) => {
        setVerify(event.target.value);
    }

    const handleDelete = async () => {
        if(verify === 'Delete This Quiz') {
            const thisPlatform = await axios.get(`/api/platforms/by_id/${props.quiz.ownerID}`).then(res => res.data);
            console.log(thisPlatform);
            await axios.put(`/api/platforms/${props.quiz.ownerID}/${props.quiz._id}/remove-quiz`)
            await axios.delete(`/api/quizzes/${props.quiz._id}`).then(res => res.data);
            window.location.href = `${window.location.origin}/platform/${thisPlatform[0].platformName}`;
        }
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <div style={{ background: '#ee8cf5', textAlign: 'center', height: '12%' }}>
                    <b style={{fontSize: '36px'}}>Quiz Deletion</b>
                </div>
                <div style={{ background: '#fc83b4', height: '88%', textAlign: 'center'}}>
                    <br />
                    <b style={{fontSize: '24px'}}>Enter "Delete This Quiz" To Delete.</b>
                    <br />
                    <b style={{fontSize: '12px'}}>WARNING! THIS CANNOT BE UNDONE!</b>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {
                        verify === 'Delete This Quiz' ?
                        <TextField variant="outlined" label="Delete This Quiz" style={{height: 'auto'}} onChange={handleVerity} value={verify} color="primary"/>
                        :
                        <TextField variant="outlined" label="Delete This Quiz" style={{height: 'auto'}} onChange={handleVerity} value={verify} color="error"/>
                    }
                    
                    <br />
                    <br />
                    <div style={{display: 'inline-block', position: 'relative', top: '20%'}}>
                        {
                            verify === 'Delete This Quiz' ?
                            <Button variant="contained" onClick={() => handleDelete()}>Delete Quiz</Button>
                            :
                            <Button variant="contained" disabled>Delete Quiz</Button>

                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteQuiz;