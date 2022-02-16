import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../styles/loginStyle.css';

function Login() {
   
  return (   
   <div className='mainContainer'>
      <div className='centralColumn'>
        
        <button 
          className='confetti-button' 
          onClick={async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            const googleLogin = await firebase.auth().signInWithPopup(provider);


            console.log(googleLogin);
          }
        }>Login With Google</button>
      </div>
    </div>
  );
}

export default Login;
