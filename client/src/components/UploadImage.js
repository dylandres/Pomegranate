import React from 'react'
import '../style/Searchresults.css';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import axios from 'axios';

function UploadImage({ imgType, colType, uid, whichImage, state}) {


    const handleSubmission = async (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
         
         
         
        const request = await axios.put(`/api/${colType}/${uid}/${whichImage}`, formData)
            .then(res => res.data);
         
        state();
    }

    return (
        <div style={{textAlign: 'center', height:'auto', width: 'auto'}}>
            <Button variant="contained" component="label" sx={{fontSize: '60px', transform: 'scale(-1,1)', height: '7vh', width: '1vw'}}> ✎
                <input type="file" hidden onChange={handleSubmission}/>
            </Button>
        </div>
    )
}

export default UploadImage;