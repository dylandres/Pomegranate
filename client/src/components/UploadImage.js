import React from 'react'
import '../style/Searchresults.css';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import axios from 'axios';

function UploadImage({ imgType, colType, uid, whichImage, state}) {

    const [file, selectFile] = useState(null);

    const changeHandler = event => {
        selectFile(event.target.files[0]);
    };

    const handleSubmission = async () => {
        if (file != null) {
            const formData = new FormData();
            formData.append('image', file);
            console.log(colType);
            console.log(uid);
            console.log(whichImage);
            const request = await axios.put(`/api/${colType}/${uid}/${whichImage}`, formData)
                .then(res => res.data);
            console.log(request);
            state();
        }
    }

    return (
        <div style={{textAlign: 'center', backgroundColor: 'lightgray', border: '1px solid black', height:'auto'}}>
            <p>{imgType}</p>
            &nbsp;
            &nbsp;
            <Button variant="contained" component="label"> Upload
                <input type="file" hidden onChange={changeHandler}/>
            </Button>
            &nbsp;
            <Button variant="contained" onClick={handleSubmission}>Submit</Button>
            &nbsp;
            &nbsp;
            {file != null ? (
                <div>
                    <p>Filename: {file.name}</p>
                    <p>Filetype: {file.type}</p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
        </div>
    )
}

export default UploadImage;