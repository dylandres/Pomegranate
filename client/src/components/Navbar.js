import React, { useContext } from 'react'
import '../style/Navbar.css';
import logo from './images/pomegranate.png'
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import  { useState } from 'react';
import GoogleWrapper from './GoogleWrapper.js'
import { myContext } from '../Context.js'
function Navbar() {
    const {userObject, setUserObject} = useContext(myContext)
    console.log(userObject)
    const [textField, setTextField] = useState('');
    const [filter, setFilter] = useState('all');
    //const [userObject, setuserObject] = useState(userObject);
    //replace userObject 
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
                {/* Button is "dead" if the search bar is empty */}
                {textField.replace(/\s/g,"") == "" ?  <button type='button' className='button'>Search</button>
                :
                <Link to={`/search?query=${textField}&filter=${filter}`}> <button type='submit' className='button'>Search</button> </Link>
                } 
            </form>
            {/* Login / Logout button */}
            <div className ='google-button'><GoogleWrapper/></div>
            {/* User Profile */}
            {userObject
            ? <Link to={`/profile/${userObject.userName}`}> <Avatar className='avatar'/></Link>
            : null }
            {/* Greeting */}
            {userObject
            ? `Hello, ${userObject.fullName}`
            : null }
            
        </div>
    );
  }

export default Navbar;