import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import VideoList from "./VideoList";

const Login = () => {
  const [login, setLogin] = useState(false)

  const responseFacebook = (response) => {
    setLogin(true);
  }

  const responseGoogle = (response) => {
    setLogin(true);
  }

  if (login) return <VideoList/>
  return (
    <div>
      <FacebookLogin
        appId="317669873136619"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <GoogleLogin
        clientId="714294518592-n112nka5f6gblald47p4k7bilel2b2si.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
      />
    </div>
  );
}

export default Login;