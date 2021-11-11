import React, { useContext } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import axios from 'axios'
import { myContext } from '../Context.js'

function GoogleWrapper() {
    const {userObject, setUserObject} = useContext(myContext)

    const handleLogin = (googleData) => {
        axios({
          method: "post",
          url: "/api/login",
          data: {
              token: googleData.tokenId
          },
        })
          .then((res) => setUserObject(res.data))
          .then(() => window.location.reload())
    }

    const handleLogout = () => {
        axios({
            method: 'delete',
            url: '/api/logout',
            data: {
                withCredentials: true
            },
        })
          .then((res) => setUserObject(null))
    }
    return (
        <div>
            {!userObject ? <GoogleLogin
            clientId = '954435352392-24bg4crh8bc1bkt4hbpq6ke6iadacv53.apps.googleusercontent.com'
            buttonText= 'Login'
            onSuccess = {handleLogin}
            onFailure = {(err) => console.log (err)}
            cookiePolicy = {'single_host_origin'}
            /> :
            <GoogleLogout
            clientId="954435352392-24bg4crh8bc1bkt4hbpq6ke6iadacv53.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            >
            </GoogleLogout>}
        </div>
        
    )
}

export default GoogleWrapper
