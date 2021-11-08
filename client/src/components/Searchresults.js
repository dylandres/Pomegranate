import React from 'react'
import '../style/Searchresults.css';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
                ? <h1>No results found!</h1>
                :
                <ul className="results">
                    {platforms.map(platform => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                <Link to={`/platform/${platform.platformName}`} style={{ textDecoration: 'none' }}>
                                    <div className="card">
                                        {/* Platform */}
                                        <div>
                                            <img className="search-card-image" alt='this is a search result'src={platform.platformLogo}></img><br />
                                        </div>
                                        <span className="card-title"><b>{platform.platformName}</b></span>
                                        <div className="card-content">
                                            <p>{platform.description}</p>
                                        </div>
                                        <div className="card-action">
                                            <a href={`/platform/${platform.platformName}`}>Visit {platform.platformName} Platform!</a>
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
                                            <img className="search-card-image" alt='this is a quiz result' src={quiz.quizLogo}></img><br />
                                        </div>
                                        <span className="card-title"><b>{quiz.quizName}</b></span>
                                        <div className="card-content">
                                            <p>{quiz.summary}</p>
                                        </div>
                                        <div className="card-action">
                                            <a href={`/quizpage/${quiz.quizName}`}>Take {quiz.quizName} Quiz!</a>
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
                                            <img className="search-card-image" alt='this is a user result'src={user.profilePicture}></img><br />
                                        </div>
                                        <span className="card-title"><b>{user.userName} ({user.fullName})</b></span>
                                        <div className="card-content">
                                            <p>{user.bio}</p>
                                        </div>
                                        <div className="card-action">
                                            <a href={`/profile/${user.userName}`}>Visit {user.userName}'s page!</a>
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
