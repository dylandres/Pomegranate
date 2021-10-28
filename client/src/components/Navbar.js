import React from 'react'
import './Navbar.css';
import logo from './images/pomegranate.png'
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import  { useState } from 'react';

function Navbar() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <div class='container'>
            {/* Logo / Home Button */}
            <Link to='/'> <img src={logo} class='logo'/> </Link>
            {/* Search bar, filter, and button */}
            <form method='GET' action='/search'>
                <input type='text' class='search-bar' name='query' placeholder="Try 'NASA'"></input>
                <select class='filter' name='filter'>
                    <option value="all">All</option>
                    <option value="platform">Platform</option>
                    <option value="quiz">Quiz</option>
                    <option value="user">User</option>
                </select>
                <button type='submit' class='button'>Search</button>
            </form>
            {/* Login / Logout button */}
            {loggedInUser == null
            ? <input type='button' class='logbutton' value='Login' onClick={() => setLoggedInUser("Bob")}></input> 
            : <Link to={'/'}> <input type='button' class='logbutton' value='Log Out' onClick={() => setLoggedInUser(null)}></input> </Link> }
            {/* User Profile */}
            {loggedInUser != null
            ? <Link to={`/profile/${loggedInUser}`}> <Avatar class='avatar'/></Link>
            : null }
            {/* Greeting */}
            {loggedInUser != null
            ? `Hello, ${loggedInUser}`
            : null }
        </div>
    );
  }

export default Navbar;