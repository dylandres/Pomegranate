import React from 'react'
import '../style/Searchresults.css';
import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResults() {

    const [results, setResult] = useState([])

    const getResults = (query, filter) => {
        if (filter == 'platform')
            return axios.get(`/api/users/${query}/platform`).then(res => res.data);
        if (filter == 'quiz')
            return axios.get(`/api/users/${query}/quiz`).then(res => res.data);
        if (filter == 'user')
            return axios.get(`/api/users/${query}/user`).then(res => res.data);
        if (filter == 'all') {
            // Combine 3 promises into 1 big promise object
            return Promise.all([axios.get(`/api/users/${query}/platform`),
                         axios.get(`/api/users/${query}/quiz`),         
                         axios.get(`/api/users/${query}/user`)])
                        // filter out empty promises
                        .then((res) => res.filter(item => item.data != ''))
                         // flatten list
                        .then((res) => res.map(item => (item.data[0])))
        }

    }

    const search = async(query, filter) => {
        const result = await getResults(query, filter);
        console.log(JSON.stringify(result));
        setResult(result);
    }

    // When this page renders, get 'query' and 'filter' params
    const url = useLocation().search;
    const query = new URLSearchParams(url).get('query');
    const filter = new URLSearchParams(url).get('filter');

    // Run search if query/filter changes
    useEffect(() => {
        search(query, filter);
      }, [query, filter])

    return (
        <body>
            {results.length > 0 ? 
                results.length > 1 ? <b>{results.length} results found</b>
                : <b>1 result found</b> 
            : <b>No results found</b>}
            <br/><br/>
            Query: {query}
            <br/>
            Filter: {filter}
            {/* <br/> */}
            {/* Results: {JSON.stringify(results)} */}
            <br/>
            {
                <ul className="results">
                    {results.map((result) => {
                        if (result.platformName)
                            return <div class="row">
                                <div class="col s12 m7">
                                <div class="card">
                                    <div class="card-image">
                                    <img src="images/sample-1.jpg"></img><br/>
                                    <span class="card-title"><b>{result.platformName}</b></span>
                                    </div>
                                    Platform
                                    <div class="card-content">
                                    <p>{result.description}</p>
                                    </div>
                                    <div class="card-action">
                                    <a href="#">Visit {result.platformName}!</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        if (result.quizName)
                            return <div class="row">
                                <div class="col s12 m7">
                                <div class="card">
                                    <div class="card-image">
                                    <img src="images/sample-1.jpg"></img><br/>
                                    <span class="card-title"><b>{result.quizName}</b></span>
                                    </div>
                                    Quiz
                                    <div class="card-content">
                                    <p>{result.summary}</p>
                                    </div>
                                    <div class="card-action">
                                    <a href="#">Visit {result.quizName}!</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        if (result.userName)
                            return <div class="row">
                                <div class="col s12 m7">
                                <div class="card">
                                    <div class="card-image">
                                    <img src="images/sample-1.jpg"></img><br/>
                                    <span class="card-title"><b>{result.userName}</b></span>
                                    </div>
                                    User
                                    <div class="card-content">
                                    <p>{result.bio}</p>
                                    </div>
                                    <div class="card-action">
                                    <a href={`/profile/${result.userName}`}>Visit {result.userName}!</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                    }
                    )}
                </ul>
            }
            <br/>
            {'end'}
        </body>
    );
  }

export default SearchResults;