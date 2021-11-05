import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function GoogleWrapper() {

    const handleLoginSuccess = (res) => {
        // const {userObj} = {email: res.profileObj.email, subscriptions: [], profile: -1, awards: []}
        // console.log({userObj})
        const userObj = {email: res.profileObj.email}
        console.log(userObj)
        axios.post('http://localhost:4000/login', userObj)
    }
    return (
        <div>
            <GoogleLogin
            clientId = '954435352392-10dqjijkaksqlb0fb482e7hgapcg1nji.apps.googleusercontent.com'
            buttonText= 'Login'
            onSuccess = {handleLoginSuccess}
            onFailure = {() => console.log ('ok')}
            cookiePolicy = {'single_host_origin'}
            />
        </div>
    )
}

export default GoogleWrapper
