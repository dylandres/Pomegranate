import React from 'react'
import '../style/Searchresults.css';
import { useState, useEffect, useReducer } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import UploadImage from './UploadImage.js';
import DeleteImage from './DeleteImage.js';

function EditQuestion({ prop_question, exists, state, newDelete }) {
    const [question, setQuestion] = useState(prop_question.question);
    const [image, setImage] = useState(prop_question.image);
    const [choice1, setChoice1] = useState(prop_question.choices[0]);
    const [choice2, setChoice2] = useState(prop_question.choices[1]);
    const [choice3, setChoice3] = useState(prop_question.choices[2]);
    const [choice4, setChoice4] = useState(prop_question.choices[3]);
    const [correct, setCorrect] = useState(prop_question.answer);
    const [isChanged, setChanged] = useState(true);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const handleEditQuestionChange = (event) => {
        setQuestion(event.target.value);
        setChanged(false);
    }

    const handleEditImageChange = (event) => {
        setImage(event.target.value);
        setChanged(false);
    }

    const handleEditChoice1Change = (event) => {
        setChoice1(event.target.value);
        setChanged(false);
    }
    const handleEditChoice2Change = (event) => {
        setChoice2(event.target.value);
        setChanged(false);
    }
    const handleEditChoice3Change = (event) => {
        setChoice3(event.target.value);
        setChanged(false);
    }
    const handleEditChoice4Change = (event) => {
        setChoice4(event.target.value);
        setChanged(false);
    }
    const handleEditAnswerChange = (answer) => {
        setCorrect(answer);
        setChanged(false);
    }

    const newImage = async () => {
        const thisImage = await axios.get(`/api/questions/${prop_question._id}`).then(res => res.data);
        setImage(thisImage[0].image);
         
    }
    useEffect(() => {
        newImage();
    }, [ignored]);

    const handleSubmission = async () => {
        if (question !== '' && choice1 !== '' && choice2 !== '' && choice3 !== '' && choice4 !== '') {
            if (exists) {
                const task = {
                    question: question,
                    image: '',
                    choices: [choice1, choice2, choice3, choice4],
                    answer: correct
                }
                await axios.put(`/api/questions/${prop_question._id}`, task);
            }
            else {
                const task = {
                    question: question,
                    image: '',
                    choices: [choice1, choice2, choice3, choice4],
                    answer: correct,
                    quizName: prop_question.quizName,
                    ownerID: prop_question.ownerID
                }
                const inserted = await axios.post(`/api/questions`, task).then(res => res.data);
                await axios.put(`/api/quizzes/${prop_question.ownerID}/${inserted._id}/newQuestion`);
            }
            setChanged(true);
            state();
        }
    }

    const handleDelete = async() => {
        if(exists) {
             
             
            await axios.put(`/api/quizzes/${prop_question.ownerID}/${prop_question._id}/deleteQuestion`);
            await axios.delete(`/api/questions/${prop_question._id}`);
            state();
        }
        else {
            newDelete();
        }
    }

    const handleCancel = () => {
        setQuestion(prop_question.question);
        setChoice1(prop_question.choices[0]);
        setChoice2(prop_question.choices[1]);
        setChoice3(prop_question.choices[2]);
        setChoice4(prop_question.choices[3]);
        setCorrect(prop_question.answer);
        setChanged(true);
    }

    const questionColor = {};

    if (!exists) {
        questionColor.backgroundColor = 'darkturquoise';
    }
    else {
        questionColor.backgroundColor = 'lightblue';
    }

    return (

        <div style={Object.assign({}, questionColor, { textAlign: 'left', border: '1px solid black', height: 'auto', width: '85vw' })}>
            <br />
            <Button variant="contained" color='error' sx={{ width: '1%', float: 'right', right: '1%' }} onClick={handleDelete}>X</Button>
            {
                exists ?
                    <div style={{position: 'absolute', left: '76%', top: '25%'}}>
                        {
                        image !== '' ? 
                            <img style={{width: '250px'}} src={image}/> 
                            :
                            <img style={{width: '250px'}} src='https://static.thenounproject.com/png/3674270-200.png'/>
                        }
                    </div>
                    :
                    null
            }
            {
                exists ?
                    <div style={{position: 'absolute', right: '1.75%', bottom: '14%', height: 'auto'}}>
                        <UploadImage imgType='Question Image' colType='questions' uid={prop_question._id} whichImage='question-image' state={forceUpdate}/>
                    </div>
                    :
                    null
            }
            {
                exists ?
                    image !== '' ?
                        <div style={{position: 'absolute', right: '7.75%', bottom: '14%', height: 'auto'}}>
                            <DeleteImage imgType='Question Image' colType='questions' uid={prop_question._id} whichImage='question-image' state={forceUpdate}/>
                        </div>
                        :
                        null
                    :
                    null
            }
            
            &nbsp;
            <TextField variant="outlined" label="Question"
                style={{ width: '90%', zIndex: 6 }} onChange={handleEditQuestionChange}
                value={question} multiline
            />
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField variant="outlined" label="Choice 1"
                style={{ width: '60%', zIndex: 6 }} onChange={handleEditChoice1Change}
                value={choice1} multiline
            />
            &nbsp;
            &nbsp;
            {correct == 0 ?
                <Button variant="contained" color='success' sx={{ width: '10%' }}>Correct</Button>
                :
                <Button variant="contained" color='error' sx={{ width: '10%' }} onClick={() => handleEditAnswerChange(0)}>Incorrect</Button>
            }
            <br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField variant="outlined" label="Choice 2"
                style={{ width: '60%', zIndex: 6 }} onChange={handleEditChoice2Change}
                value={choice2} multiline
            />
            &nbsp;
            &nbsp;
            {correct == 1 ?
                <Button variant="contained" color='success' sx={{ width: '10%' }} >Correct</Button>
                :
                <Button variant="contained" color='error' sx={{ width: '10%' }} onClick={() => handleEditAnswerChange(1)}>Incorrect</Button>
            }
            <br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField variant="outlined" label="Choice 3"
                style={{ width: '60%', zIndex: 6 }} onChange={handleEditChoice3Change}
                value={choice3} multiline
            />
            &nbsp;
            &nbsp;
            {correct == 2 ?
                <Button variant="contained" color='success' sx={{ width: '10%' }}>Correct</Button>
                :
                <Button variant="contained" color='error' sx={{ width: '10%' }} onClick={() => handleEditAnswerChange(2)}>Incorrect</Button>
            }
            <br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField variant="outlined" label="Choice 4"
                style={{ width: '60%', zIndex: 6 }} onChange={handleEditChoice4Change}
                value={choice4} multiline
            />
            &nbsp;
            &nbsp;
            {correct == 3 ?
                <Button variant="contained" color='success' sx={{ width: '10%' }} >Correct</Button>
                :
                <Button variant="contained" color='error' sx={{ width: '10%' }} onClick={() => handleEditAnswerChange(3)}>Incorrect</Button>
            }
            {/* which image? atate forceUpdate? */}

            <div style={{position: 'absolute', transform: 'translate(-50%, 25%)', left: '50%', height: 'auto'}}>
                {!isChanged ?
                    <Button variant="contained" onClick={handleCancel}>Cancel Changes</Button>
                    :
                    <Button variant="contained" disabled onClick={handleCancel}>Cancel Changes</Button>
                }
                &nbsp;
                &nbsp;
                {!isChanged ?
                    <Button variant="contained" onClick={handleSubmission}>Confirm Changes</Button>
                    :
                    <Button variant="contained" disabled onClick={handleSubmission}>Confirm Changes</Button>
                }
                </div>
            <br />
            <br/>
            <br/>
            <br/>
        </div>
        
    )
}

export default EditQuestion;