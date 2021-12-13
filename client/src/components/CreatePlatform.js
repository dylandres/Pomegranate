import React from 'react'
import '../style/CreatePlatform.css';
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
import zIndex from '@material-ui/core/styles/zIndex';
import { myContext } from '../Context.js'
import ProfilePage from './Profilepage';

function CreatePlatform(props) {
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    }


    const handleCreate = async () => {
        const properties = {
            ownerID: props.user._id,
            subscribers: [],
            platformName: name,
            platformLogo: '',
            platformBanner: '',
            description: summary,
            quizzes: [],
            leaderboard: []
        };
        const plat = await axios.post(`/api/platforms`, properties).then(res => res.data);
         

        window.location.href = `${window.location.origin}/platform/${plat.platformName}`;
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <div style={{ background: '#ee8cf5', textAlign: 'center', height: '12%' }}>
                    <b style={{fontSize: '36px'}}>Platform Creation</b>
                </div>
                <div style={{ background: '#fc83b4', height: '88%'}}>
                    <br />
                    <TextField variant="outlined" label="Name" style={{height: 'auto'}} onChange={handleNameChange} value={name}/>
                    <br />
                    <br />
                    <TextField variant="outlined" label="Summary" multiline
                        style={{ width: '80%', height: '30vh'}} onChange={handleSummaryChange} value={summary}/>
                    <br/>
                    <div style={{display: 'inline-block', position: 'absolute', top: '40vh', right: '1%'}}>
                        <Button variant="contained" onClick={() => handleCreate()}>Create Platform</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlatform;