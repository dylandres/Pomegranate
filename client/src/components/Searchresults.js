import React from 'react'
import '../style/Searchresults.css';
import  { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function SearchResults() {

    const [platforms, setPlatforms] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [users, setUsers] = useState([]);

    const getPlatforms = async(query) => {
        const result = await axios.get(`/api/users/${query}/platform`).then(res => res.data);
        setPlatforms(result);
    }

    const getQuizzes = async(query) => {
        const result = await axios.get(`/api/users/${query}/quiz`).then(res => res.data);
        setQuizzes(result);
    }

    const getUsers = async(query) => {
        const result = await axios.get(`/api/users/${query}/user`).then(res => res.data);
        setUsers(result);
    }

    // When this page renders, get 'query' and 'filter' params
    const url = useLocation().search;
    const query = new URLSearchParams(url).get('query');
    const filter = new URLSearchParams(url).get('filter');

    // Run search if query/filter changes
    useEffect(() => {
        if (filter == "platform" || filter === "all")
            getPlatforms(query);
        if (filter == "quiz" || filter === "all") 
            getQuizzes(query);
        if (filter == "user" || filter === "all")
            getUsers(query);
      }, [query, filter])

    return (
        <body>
            <br/><br/>
            {
                <ul className="results">
                    {platforms.map(platform => (
                            <Link to={`/platform/${platform.platformName}`} style={{ textDecoration: 'none' }}>
                                <div className="card_container">
                                <div className="col s12 m7">
                                <div className="card">
                                {/* Platform */}
                                    <div>
                                    <img className="search-card-image" src={platform.platformLogo}></img><br/>
                                    </div>
                                    <span className="card-title"><b>{platform.platformName}</b></span>
                                    <div className="card-content">
                                    <p>{platform.description}</p>
                                    </div>
                                    <div className="card-action">
                                    <a href={`/platform/${platform.platformName}`}>Visit {platform.platformName}!</a>
                                    </div>
                                </div>
                                </div>
                            </div></Link>
                    ))}
                    {quizzes.map((quiz) => (
                        <Link to={`/quizpage/${quiz.quizName}`} style={{ textDecoration: 'none' }}>
                            <div className="card_container">
                            <div className="col s12 m7">
                            <div className="card">
                                <div>
                                <img className="search-card-image" src={quiz.quizLogo}></img><br/>
                                </div>
                                <span className="card-title"><b>{quiz.quizName}</b></span>
                                <div className="card-content">
                                <p>{quiz.summary}</p>
                                </div>
                                <div className="card-action">
                                <a href={`/quizpage/${quiz.quizName}`}>Visit {quiz.quizName}!</a>
                                </div>
                            </div>
                            </div>
                        </div></Link>
                    ))}
                    {users.map((user) => (
                            <Link to={`/profile/${user.userName}`} style={{ textDecoration: 'none' }}>
                                <div className="card_container">
                                <div className="col s12 m7">
                                <div className="card">
                                    <div>
                                    <img className="search-card-image" src={user.profilePicture}></img><br/>
                                    </div>
                                    <span className="card-title"><b>{user.userName} ({user.fullName})</b></span>
                                    <div className="card-content">
                                    <p>{user.bio}</p>
                                    </div>
                                    <div className="card-action">
                                    <a href={`/profile/${user.userName}`}>Visit {user.userName}!</a>
                                    </div>
                                </div>
                                </div>
                            </div></Link>
                    ))}
                </ul>
            }
            <br/>
        </body>
    );
  }

export default SearchResults;