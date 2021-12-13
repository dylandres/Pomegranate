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
          .then((err) =>  console.log())
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
          .then(() => window.location.reload()) 
    }
    return (
        <div>
            {!userObject ? <GoogleLogin
            clientId = '954435352392-0hr4iqn8uii9u9kkoj1di3p8s5calv0t.apps.googleusercontent.com'
            buttonText= 'Login'
            onSuccess = {handleLogin}
            onFailure = {(err) =>  console.log()}
            cookiePolicy = {'single_host_origin'}
            /> :
            <GoogleLogout
            clientId="954435352392-0hr4iqn8uii9u9kkoj1di3p8s5calv0t.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            >
            </GoogleLogout>}
        </div>
        
    )
}

export default GoogleWrapper
