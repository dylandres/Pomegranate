import React from 'react'
import './Navbar.css';
import logo from './images/pomegranate.png'
import { Avatar } from '@material-ui/core';
import  { useState } from 'react';

function Navbar() {

    const [textField, setTextField] = useState({content: '', checked: false});
    // const [filter, setFilter] = usestat

    return (
        <div class='container'>
            {/* Logo / Home Button */}
            <img src={logo} class='logo'/>
            {/* Search bar, filter, and button */}
            <form method='GET' action='/search'>
                <input type='text' class='search-bar' value = {textField.content} placeholder="Try 'NASA'"
                onChange={e=>setTextField({...textField, content:e.target.value})}></input>
                <select class='filter'>
                    <option value="all">All</option>
                    <option value="title">Platform</option>
                    <option value="class">Quiz</option>
                    <option value="day">User</option>
                </select>
                <input type='button' class='button' value='Search'></input>
            </form>
            {/* Profile Pic / Profile Button */}
            <Avatar class='avatar'/>
        </div>
    );
  }

export default Navbar;