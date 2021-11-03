import React from 'react'
import GoogleLogin from 'react-google-login'

function GoogleWrapper() {
    return (
        <div>
            <GoogleLogin
            clientId = '954435352392-10dqjijkaksqlb0fb482e7hgapcg1nji.apps.googleusercontent.com'
            buttonText= 'Login'
            onSuccess = {() => console.log('wow')}
            onFailure = {() => console.log ('ok')}
            cookiePolicy = {'single_host_origin'}
            />
        </div>
    )
}

export default GoogleWrapper
