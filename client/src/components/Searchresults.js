import React from 'react'
import '../style/Searchresults.css';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import axios from 'axios';

function SearchResults() {

    var stringSimilarity = require("string-similarity"); //for comparing search results

    const [platforms, setPlatforms] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [users, setUsers] = useState([]);
    const [results, setResults] = useState([]);
    const [quizzesEmpty, setQuizzesEmpty] = useState(false);
    const [usersEmpty, setUsersEmpty] = useState(false);
    const [platformsEmpty, setPlatformsEmpty] = useState(false);
    
    let allResults = [];

    const getPlatforms = async (query) => {
        const result = await axios.get(`/api/users/${query}/platform`).then(res => res.data);
        if(result.length === 0) {
            setPlatformsEmpty(true);
            return;
        }
        result.forEach(platform => {
                let link = 'platform/' + platform.platformName
                let image = platform.platformLogo !== '' ? platform.platformLogo : 'https://pomegranate-io.s3.amazonaws.com/pomegranate.png' 
                let title = platform.platformName
                let description = platform.description
                let rank = 0.75 * stringSimilarity.compareTwoStrings(query, platform.platformName) + 0.25 * stringSimilarity.compareTwoStrings(query, platform.description)
                 
                 
                let plObj = {
                    rank: rank,
                    link: link,
                    image: image,
                    title: title,
                    description: description,
                    type: 'Platform',
                };
                allResults.push(plObj)
            }   
        )
        allResults.sort(function(a, b){
            return b.rank - a.rank
        })
         
         
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
        if(result.length === 0) {
            setQuizzesEmpty(true);
            return;
        }
        let res = []
        result.forEach(quiz => {
            if(quiz.published) {
            let link = 'quizpage/' + quiz.quizName
            let image = quiz.quizLogo !== '' ? quiz.quizLogo : 'https://pomegranate-io.s3.amazonaws.com/pomegranate.png'
            let title = quiz.quizName
            let description = quiz.summary
            let rank = 0.75 * stringSimilarity.compareTwoStrings(query, title) + 0.25 * stringSimilarity.compareTwoStrings(query, description)
             
             
            let plObj = {
                rank: rank,
                link: link,
                image: image,
                title: title,
                description: description,
                type: 'Quiz',
            };
            allResults.push(plObj)
            }
        }   
        )
        allResults.sort(function(a, b){
            return b.rank - a.rank
        })
         
         
        setResults(allResults)
        setQuizzes(result);
    }

    const getUsers = async (query) => {
        const result = await axios.get(`/api/users/${query}/user`).then(res => res.data);
         
        if(result.length === 0) {
            setUsersEmpty(true);
            return;
        }
        result.forEach(user => {
            let link = 'profile/' + user.userName
            let image = user.profilePicture !== '' ? user.profilePicture : 'https://pomegranate-io.s3.amazonaws.com/24-248253_user-profile-default-image-png-clipart-png-download.png'
            let title = user.userName
            let description = user.bio
            let rank = 0.75 * stringSimilarity.compareTwoStrings(query, title) + 0.25 * stringSimilarity.compareTwoStrings(query, description)
             
             
            let plObj = {
                rank: rank,
                link: link,
                image: image,
                title: title,
                description: description,
                type: 'User',
            };
            allResults.push(plObj)
            }   
        )
        allResults.sort(function(a, b){
            return b.rank - a.rank
        })
        setResults(allResults)
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
        allResults = [];
    }

    // const combineResults = (quizzes, platforms, users) => {
    //     console.clear()
    //     // setTimeout(() => 
    //      
    //     //  
    //     quizzes.forEach(quiz => {
    //              
    //              
    //             allResults.push(quiz.quizName)
    //         }   
    //     )
    //     platforms.forEach(platform => {
    //              
    //              
    //             allResults.push(platform.platformName)
    //         }   
    //     )
    //     users.forEach(user => {
    //          
    //          
    //         allResults.push(user.userName)
            
    //     }
        
    // )
    
    // }

    // Run search if query/filter changes
    useEffect( async () => {
        clearAll();
        if (filter === "platform" || filter === "all")
            getPlatforms(query);
        if (filter === "quiz" || filter === "all")
            getQuizzes(query);
        if (filter === "user" || filter === "all")
            getUsers(query);
        results.sort(function(a, b){
            return b.rank - a.rank
        })
         
         
    }, [query, filter])

    return (
        <body>
            <br /><br />
            
            
            
            
            {
                (!platforms.length && !quizzes.length && !users.length) 
                ? 
                    (platformsEmpty && quizzesEmpty && usersEmpty) ?
                    <div style={{position: 'absolute', transform: 'translateX(-50%) translateY(-50%)', left: '50%', top: '50%'}}>No search results found!</div>
                    :
                    <div className='loader'></div>
                :
                <ul className="results">
                    {results.map((result) => (
                        <div className="card_container">
                            <div className="col s12 m7">
                                <div className="card">
                                    <Link to={result.link} style={{ textDecoration: 'none' }}>
                                        <h3>{result.type}</h3>
                                        <div>
                                            {result.image !== '' ? <img className="search-card-image" src={result.image}></img>:null}
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
