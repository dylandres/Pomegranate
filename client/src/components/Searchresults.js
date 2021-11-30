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
        // let res = []
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
                    type: 'Platform',
                };
                // /platform/${platform.platformName}
                allResults.push(plObj)
            }   
        )
        allResults.sort(function(a, b){
            return a.rank - b.rank
        })
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
            let rank = Math.floor(Math.random() * 1000)
            let link = 'quizpage/' + quiz.quizName
            let image = quiz.quizLogo
            let title = quiz.quizName
            let description = quiz.summary
            let plObj = {
                rank: rank,
                link: link,
                image: image,
                title: title,
                description: description,
                type: 'Quiz',
            };
            // /platform/${platform.platformName}
            allResults.push(plObj)
            }   
        )
        allResults.sort(function(a, b){
            return a.rank - b.rank
        })
        console.log('getResults')
        console.log(allResults)
        setResults(allResults)
        setQuizzes(result);
    }

    const getUsers = async (query) => {
        const result = await axios.get(`/api/users/${query}/user`).then(res => res.data);
        let res = []
        result.forEach(user => {
            let rank = Math.floor(Math.random() * 1000)
            let link = 'quizpage/' + user.userName
            let image = user.profilePicture
            let title = user.userName
            let description = user.bio
            let plObj = {
                rank: rank,
                link: link,
                image: image,
                title: title,
                description: description,
                type: 'User',
            };
            // /platform/${platform.platformName}
            allResults.push(plObj)
            }   
        )
        allResults.sort(function(a, b){
            return a.rank - b.rank
        })
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
        results.sort(function(a, b){
            return a.rank - b.rank
        })
        console.log("all results")
        console.log(allResults)
        // items.sort(function (a, b) {
        //     return a.value - b.value;
        //   });
    }, [query, filter])

    return (
        <body>
            <br /><br />
            {
                (!platforms.length && !quizzes.length && !users.length) 
                ? <div className='loader'></div>
                :
                <ul className="results">
                    {results.map((result) => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                <div className="card">
                                    <Link to={result.link} style={{ textDecoration: 'none' }}>
                                        <h3>{result.type}</h3>
                                        <div>
                                            {result.image !== '' ? <img className="search-card-image" src={result.image}></img>:<img className="search-card-image" src="https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png"></img>}
                                        </div>
                                        <span className="card-title"><h2>{result.title}</h2></span>
                                        <div className="card-content">
                                            <p>{result.description}</p>
                                            
                                        </div> 
                                    </Link>
                                </div>    
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
