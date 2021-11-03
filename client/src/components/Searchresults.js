import React from 'react'
import '../style/Searchresults.css';
import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResults() {

    const [results, setResult] = useState([])

    const getResults = (query, filter) => {
        return axios.get('http://localhost:4000/api/users').then(res => res.data);
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
    // Then run a search once
    useEffect(() => {
        search(query, filter);
      }, [])
    return (
        <body>
            <b>Search results</b>
            <br/><br/>
            Query: {query}
            <br/>
            Filter: {filter}
            <br/>
            Results: {JSON.stringify(results)}
        </body>
    );
  }

export default SearchResults;