import React from 'react'
import '../style/Quiztaking.css';
import  { useState, useEffect } from 'react';
import '../style/tabs.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuizTaking() {

    const parse = (url) => {
        var parsed = "";
        for (var i = 0; i < url.length; i++) {
            // interpret %20 as a space character
            if (url[i] == '%') {
                parsed += ' ';
                i += 2;
            }
            else
                parsed += url[i];
        }
        return parsed
    }
    // Get username from url
    const quizName = parse(window.location.href.split('/').pop());

    return (
        <body>
            <h1 className='title'>quiz taking page for {quizName}</h1>
        </body>
    );
  }

export default QuizTaking;