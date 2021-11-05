import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function GoogleWrapper() {

    const handleLoginSuccess = (res) => {

        const userObj = {email: res.profileObj.email, subscriptions: [], awards: [], givenName: res.profileObj.givenName, famName: res.profileObj.familyName}
        console.log(userObj)
        axios.post('api/login', userObj)
    }
    return (
        <div>
            <GoogleLogin
            clientId = '954435352392-24bg4crh8bc1bkt4hbpq6ke6iadacv53.apps.googleusercontent.com'
            buttonText= 'Login'
            onSuccess = {handleLoginSuccess}
            onFailure = {(err) => console.log (err)}
            cookiePolicy = {'single_host_origin'}
            />
        </div>
    )
}

export default GoogleWrapper
