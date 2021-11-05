import React from 'react'
import '../style/Navbar.css';
import logo from './images/pomegranate.png'
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import  { useState } from 'react';

function Navbar() {

    const [textField, setTextField] = useState('');
    const [filter, setFilter] = useState('all');
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <div className='container'>
            {/* Logo / Home Button */}
            <Link to='/'> <img src={logo} className='logo' alt='Pomegranate logo'/> </Link>
            {/* Search bar, filter, and button */}
            <form method='GET' action={`/search?query=${textField}&filter=${filter}`}>
                <input type='text' className='search-bar' name='query' value = {textField} onChange={e=>setTextField(e.target.value)}placeholder="Try 'NASA'"></input>
                <select className='filter' name='filter' onChange={e=>setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="platform">Platform</option>
                    <option value="quiz">Quiz</option>
                    <option value="user">User</option>
                </select>
                <Link to={`/search?query=${textField}&filter=${filter}`}> <button type='submit' className='button'>Search</button> </Link>
            </form>
            {/* Login / Logout button */}
            {loggedInUser == null
            ? <input type='button' className='logbutton' value='Login' onClick={() => setLoggedInUser("Bob")}></input> 
            : <Link to={`/`}> <input type='button' className='logbutton' value='Log Out' onClick={() => setLoggedInUser(null)}></input> </Link> }
            {/* User Profile */}
            {loggedInUser != null
            ? <Link to={`/profile/${loggedInUser}`}> <Avatar className='avatar'/></Link>
            : null }
            {/* Greeting */}
            {loggedInUser != null
            ? `Hello, ${loggedInUser}`
            : null }
        </div>
    );
  }

export default Navbar;