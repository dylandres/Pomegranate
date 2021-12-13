import React from 'react'
import '../style/Searchresults.css';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import axios from 'axios';

function DeleteImage({ imgType, colType, uid, whichImage, state}) {

    const handleSubmission = async () => {
        const request = await axios.put(`/api/${colType}/${uid}/${whichImage}/delete`)
            .then(res => res.data);
         
        state();
    }

    return (
        <div style={{textAlign: 'center', height:'auto', width: 'auto'}}>
            <Button variant="contained" component="label" sx={{fontSize: '60px', height: '7vh', width: '1vw'}}
            onClick={handleSubmission}>
                <img style={{width: '100%', height: '100%', filter: 'invert(100%)'}} src='https://www.freeiconspng.com/thumbs/trash-can-icon/trash-can-icon-26.png'/>
            </Button>
        </div>
    )
}

export default DeleteImage;