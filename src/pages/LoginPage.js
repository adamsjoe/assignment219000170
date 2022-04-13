import React from 'react';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../styles/loginStyle.css';


function Login() {
  let history = useHistory();

  return (
    <div className='centralColumn'>

      <button
        className='confetti-button'
        onClick={async () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          const googleLogin = await firebase.auth().signInWithPopup(provider);
          if (googleLogin) {
            history.push('/');
          }
        }
        }>Login With Google</button>
    </div>

  );
}

export default Login;
