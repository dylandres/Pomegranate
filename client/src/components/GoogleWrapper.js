import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function GoogleWrapper() {

    const googleAuth = ({ profileObj }) => {
        console.log(profileObj)
        axios({
          method: "post",
          url: "/api/login",
          data: {
            //googleId: profileObj.googleId,
            email: profileObj.email,
            firstName: profileObj.givenName,
            lastName: profileObj.familyName,
            profilePicture: profileObj.imageUrl
          },
        })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
    }
    return (
        <div>
            <GoogleLogin
            clientId = '954435352392-24bg4crh8bc1bkt4hbpq6ke6iadacv53.apps.googleusercontent.com'
            buttonText= 'Login'
            onSuccess = {googleAuth}
            onFailure = {(err) => console.log (err)}
            cookiePolicy = {'single_host_origin'}
            />
        </div>
    )
}

export default GoogleWrapper
