import React from 'react'
import './Navbar.css';
import logo from './images/pomegranate.png'
import { Avatar } from '@material-ui/core';
import  { useState } from 'react';

function Navbar() {

    const [textField, setTextField] = useState({content: ''});
    const [filter, setFilter] = useState({filter: 'all'});
    // const [searchResults, setSearchResults] = useState({content: []})

    const searchFor = async (text, filter) => {
        // const results = await search;
        // setSearchResults(results);
    }

    return (
        <div class='container'>
            {/* Logo / Home Button */}
            <img src={logo} class='logo'/>
            {/* Search bar, filter, and button */}
            <form method='GET' action='/search'>
                <input type='text' class='search-bar' value = {textField.content} placeholder="Try 'NASA'"
                onChange={e=>setTextField({...textField, content:e.target.value})}></input>
                <select class='filter' onChange={e=>setFilter({filter:e.target.value})}>
                    <option value="all">All</option>
                    <option value="platform">Platform</option>
                    <option value="quiz">Quiz</option>
                    <option value="user">User</option>
                </select>
                <input type='button' class='button' value='Search' onClick={e=>searchFor(textField, filter)}></input>
            </form>
            {/* Profile Pic / Profile Button */}
            <Avatar class='avatar'/>
        </div>
    );
  }

export default Navbar;