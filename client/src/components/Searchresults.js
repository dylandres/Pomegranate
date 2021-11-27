import React from 'react'
import '../style/Searchresults.css';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

function SearchResults() {

    const [platforms, setPlatforms] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [users, setUsers] = useState([]);

    const getPlatforms = async (query) => {
        const result = await axios.get(`/api/users/${query}/platform`).then(res => res.data);
        setPlatforms(result);
    }

    const getQuizzes = async (query) => {
        const result = await axios.get(`/api/users/${query}/quiz`).then(res => res.data);
        setQuizzes(result);
    }

    const getUsers = async (query) => {
        const result = await axios.get(`/api/users/${query}/user`).then(res => res.data);
        setUsers(result);
    }

    // When this page renders, get 'query' and 'filter' params
    const url = useLocation().search;
    const query = new URLSearchParams(url).get('query');
    const filter = new URLSearchParams(url).get('filter');

    const clearAll = () => {
        setPlatforms([]);
        setQuizzes([]);
        setUsers([]);
    }

    // Run search if query/filter changes
    useEffect(() => {
        clearAll();
        if (filter === "platform" || filter === "all")
            getPlatforms(query);
        if (filter === "quiz" || filter === "all")
            getQuizzes(query);
        if (filter === "user" || filter === "all")
            getUsers(query);
    }, [query, filter])

    return (
        <body>
            <br /><br />
            {
                (!platforms.length && !quizzes.length && !users.length) 
                ? <div className='loader'></div>
                :
                <ul className="results">
                    {platforms.map(platform => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                <Link to={`/platform/${platform.platformName}`} style={{ textDecoration: 'none' }}>
                                    <div className="card">
                                        {/* Platform */}
                                        <div>
                                            {platform.platformLogo !== '' ? <img className="search-card-image" src={platform.platformLogo}></img>:<img className="search-card-image" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                                        </div>
                                        <span className="card-title"><b>{platform.platformName}</b></span>
                                        <div className="card-content">
                                            <p>{platform.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                    {quizzes.map((quiz) => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                <Link to={`/quizpage/${quiz.quizName}`} style={{ textDecoration: 'none' }}>
                                    <div className="card">
                                        <div>
                                            {quiz.quizLogo !== '' ? <img className="search-card-image" src={quiz.quizLogo}></img>:<img className="search-card-image" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                                        </div>
                                        <span className="card-title"><b>{quiz.quizName}</b></span>
                                        <div className="card-content">
                                            <p>{quiz.summary}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                    {users.map((user) => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                <Link to={`/profile/${user.userName}`} style={{ textDecoration: 'none' }}>
                                    <div className="card">
                                        <div>
                                            {user.profilePicture !== '' ? <img className="search-card-image" src={user.profilePicture}></img>:<img className="search-card-image" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                                        </div>
                                        <span className="card-title"><b>{user.userName} ({user.fullName})</b></span>
                                        <div className="card-content">
                                            <p>{user.bio}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </ul>
            }
            <br />
        </body>
    );
}

export default SearchResults;
