import React from 'react'
import '../style/CreateQuiz.css';
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

function CreateQuiz(props) {
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [restricted, setRestricted] = useState(false);
    const [empty, setEmpty] = useState(true);

    const handleNameChange = (event) => {
        const delims  = [":" , "/" , "?" , "#" , "[" , "]" , "@", "!" , "$" , "&" , "'" , "(" , ")"
        , "*" , "+" , "," , ";" , "=", "%", "^", "{", "}", "|", "\\", "\""];
        var isRestricted = false
        delims.map(thisChar => {
            if(isRestricted === false)
                isRestricted = event.target.value.includes(thisChar)
        });
        var isEmpty = event.target.value.length === 0
        setRestricted(isRestricted)
        setEmpty(isEmpty)
        setName(event.target.value);
    }

    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    }


    const handleCreate = async () => {
            const properties = {
                ownerID: props.platform._id,
                questions: [],
                leaderboard: {},
                quizName: name,
                quizLogo: '',
                quizBanner: '',
                summary: summary,
                timesTaken: 0,
                totalRating: 0,
                totalVotes: 0,
                published: false
            };
            const quiz = await axios.post(`/api/quizzes`, properties).then(res => res.data);
            await axios.put(`/api/platforms/${props.platform._id}/${quiz._id}/add-quiz`).then(res => res.data);
             
            window.location.href = `${window.location.origin}/quizpage/${quiz.quizName}`;
    }

    return (
        <div className="popup-box-quiz">
            <div className="box-quiz">
                <span className="close-icon-quiz" onClick={props.handleClose}>x</span>
                <div style={{ background: '#ee8cf5', textAlign: 'center', height: '12%' }}>
                    <b style={{fontSize: '36px'}}>Quiz Creation</b>
                </div>
                <div style={{ background: '#fc83b4', height: '88%'}}>
                    <br />
                    {restricted ? 
                    <TextField variant="outlined" label="Invalid Character In Name!" style={{height: 'auto'}} onChange={handleNameChange} value={name}/>
                    :
                    <TextField variant="outlined" label="Name" style={{height: 'auto'}} onChange={handleNameChange} value={name}/>
                    }
                    <br />
                    <br />
                    <TextField variant="outlined" label="Summary" multiline
                        style={{ width: '80%', height: '30vh'}} onChange={handleSummaryChange} value={summary}/>
                    <br/>
                    <div style={{display: 'inline-block', position: 'absolute', top: '40vh', right: '1%'}}>
                        {(restricted || empty) ? 
                            <Button disabled variant="contained" onClick={() => handleCreate()}>Create Quiz</Button>
                            :
                            <Button variant="contained" onClick={() => handleCreate()}>Create Quiz</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQuiz;