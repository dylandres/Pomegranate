import React from 'react'
import '../style/Searchresults.css';
import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {

    const [results, setResult] = useState([])

    const search = async(query, filter) => {
        const result = 1;
    }

    // When this page renders, get 'query' and 'filter' params
    const url = useLocation().search;
    const query = new URLSearchParams(url).get('query');
    const filter = new URLSearchParams(url).get('filter');
    // Then run a search
    search(query, filter);
    return (
        <body>
            <b>Search results</b>
            <br/><br/>
            Query: {query}
            <br/>
            Filter: {filter}
        </body>
    );
  }

export default SearchResults;