import './styles/navbar.css';
import { useGlobal, setGlobal } from 'reactn';
import React, {useState, useEffect} from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';

import QuestionPage from './pages/QuestionPage';
import ProblemIndex from './pages/ProblemIndex';

import logo from './icons/iCog-icon.svg';
import Login from './pages/LoginPage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function googleSignOut() {
  firebase.auth().signOut()
}

function getFirstNameFromGoogle() {
  var user = firebase.auth().currentUser;
  var names = user.displayName.split(' ')
  return names[0]
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    console.log('Authenticated', authenticated);
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, [authenticated]);

  return (
    <div className='container'>
      <div className="row">
        <nav className='navbar navbar-default navbar-expand-lg headingLine'>
          <div className="container-fluid ">
            <div className='navbar-header'>
              <img src={logo} alt='logo' width='50px'/>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/" className="nav-link custom-nav-link">Problem Index</Link></li>
              <li><Link to="/generator" className="disabled-link nav-link custom-nav-link">Problem Generator</Link></li>
              <li>{(authenticated) ? <Link to="#" className="nav-link custom-nav-link" onClick={googleSignOut}>Sign Out, {getFirstNameFromGoogle()} <span className='noMessages'>0</span></Link> : <Link to="/login" className="nav-link custom-nav-link">Login Or Signup</Link>}</li>
            </ul>
          </div>
        </nav>        
      </div> 
      <div className="col-sm">
        {authenticated === true ?                    
          <div>
            <ProblemIndex auth={authenticated}/>
          </div>
          :
          <>
          <h3 className="text-center"><br />Please login to view content</h3>
          <Route exact path="/login">
            <Login />
          </Route>
          </>
        }
      </div>
    </div>
  );
}

export default App;
