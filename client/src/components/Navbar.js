import React from 'react'
import './Navbar.css';
import logo from './images/pomegranate.png'
import { Avatar } from '@material-ui/core';
// import  { useState } from 'react';

function Navbar() {

    return (
        <div class='container'>
            {/* Logo / Home Button */}
            <img src={logo} class='logo'/>
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
            {/* Profile Pic / Profile Button */}
            <Avatar class='avatar'/>
        </div>
    );
  }

export default Navbar;