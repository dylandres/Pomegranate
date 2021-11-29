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
    const [results, setResults] = useState([]);
    // const [allResults, setAllResults] = useState([]);
    let allResults = [];
    let testArr = ['a', 'b', 'c']

    const getPlatforms = async (query) => {
        const result = await axios.get(`/api/users/${query}/platform`).then(res => res.data);
        let res = []
        result.forEach(platform => {
                let rank = Math.floor(Math.random() * 1000)
                let link = 'platform/' + platform.platformName
                let image = platform.platformLogo
                let title = platform.platformName
                let description = platform.description
                let plObj = {
                    rank: rank,
                    link: link,
                    image: image,
                    title: title,
                    description: description,
                };
                // /platform/${platform.platformName}
                allResults.push(plObj)
            }   
        )
        console.log('getResults')
        console.log(allResults)
        setResults(allResults)
        setPlatforms(result);
        // const person = {
        //     firstName: "John",
        //     lastName: "Doe",
        //     age: 50,
        //     eyeColor: "blue"
        //   };
        // Math.floor(Math.random() * max);
    }

    const getQuizzes = async (query) => {
        const result = await axios.get(`/api/users/${query}/quiz`).then(res => res.data);
        let res = []
        result.forEach(quiz => {
                console.log('qz')
                console.log(quiz)
                res.push(quiz.quizName)
                allResults.push(quiz.quizName)
            }   
        )
        console.log('getResults')
        console.log(allResults)
        setResults(allResults)
        setQuizzes(result);
    }

    const getUsers = async (query) => {
        const result = await axios.get(`/api/users/${query}/user`).then(res => res.data);
        let res = []
        result.forEach(user => {
                res.push(user.userName)
                allResults.push(user.userName)
            }   
        )
        // console.log('getResults')
        // console.log(allResults)
        setResults(allResults)
        setUsers(result);
    }

    // const getAllResults = async (query) => {
    //     // const result = await axios.get(`/api/users/${query}/user`).then(res => res.data);
    //     // setAllResults(result);
    // }

    // When this page renders, get 'query' and 'filter' params
    const url = useLocation().search;
    const query = new URLSearchParams(url).get('query');
    const filter = new URLSearchParams(url).get('filter');

    const clearAll = () => {
        setPlatforms([]);
        setQuizzes([]);
        setUsers([]);
        allResults = [];
    }

    const combineResults = (quizzes, platforms, users) => {
        console.clear()
        // setTimeout(() => {console.log("this is the first message")}, 5000);
        console.log('combine results called')
        // console.log(quizzes)
        quizzes.forEach(quiz => {
                console.log('qz')
                console.log(quiz)
                allResults.push(quiz.quizName)
            }   
        )
        platforms.forEach(platform => {
                console.log('pl')
                console.log(platform)
                allResults.push(platform.platformName)
            }   
        )
        users.forEach(user => {
            console.log('us')
            console.log(user)
            allResults.push(user.userName)
            
        }
        
    )
    
    }

    // Run search if query/filter changes
    useEffect( async () => {
        clearAll();
        if (filter === "platform" || filter === "all")
            getPlatforms(query);
        if (filter === "quiz" || filter === "all")
            getQuizzes(query);
        if (filter === "user" || filter === "all")
            getUsers(query);
        // let a = quizzes.concat(platforms)
        // allResults = a.concat(users)
        // allResults = allResults.conctat(users)
        // combineResults(quizzes, platforms, users)
        console.log("all results")
        console.log(allResults)
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
                                            {platform.platformLogo !== '' ? <img className="search-card-image" src={platform.platformLogo}></img>:<img className="search-card-image" src="https://pomegranate-io.s3.amazonaws.com/pomegranate.png"></img>}
                                        </div>
                                        <span className="card-title"><b>{platform.platformName}</b></span>
                                        <div className="card-content">
                                            <p>{platform.description}</p>
                                            <h1>Platform</h1>
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
                                            <h1>Quiz</h1>
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
                                            <h1>User</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                    {results.map((result) => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                {<h1>x</h1>
                                /* <Link to={`/profile/${user.userName}`} style={{ textDecoration: 'none' }}>
                                    <div className="card">
                                        <div>
                                            {user.profilePicture !== '' ? <img className="search-card-image" src={user.profilePicture}></img>:<img className="search-card-image" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                                        </div>
                                        <span className="card-title"><b>{user.userName} ({user.fullName})</b></span>
                                        <div className="card-content">
                                            <p>{user.bio}</p>
                                            <h1>User</h1>
                                        </div>
                                    </div>
                                </Link> */}
                                {/* <Link to={result.link}> */}
                                    <h1>{result.title}</h1>
                                    <h1>{result.description}</h1>
                                {/* </Link> */}
                                
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
