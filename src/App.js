import './styles/navbar.css';
import React, {useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';

import QuestionPage from './pages/QuesionPage';
import ProblemIndex from './pages/ProblemIndex';

import logo from './icons/iCog-icon.svg';
import Login from './pages/LoginPage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function googleSignOut() {
  // firebase.auth().signOut()
  var user = firebase.auth().currentUser;
  // console.log(user.displayName)
  user.delete().then(function() {
    console.log("User deleted successfully")
  }, function(error) {
    console.error("Error deleting user :" + error)
  });
}

function getFirstNameFromGoogle() {
  var user = firebase.auth().currentUser;
  var names = user.displayName.split(' ')
  console.log(">>> ", names)
  return names[0]
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {    
    firebase.auth().onAuthStateChanged((user) => {
  
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);  

  
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

      <Route exact path="/"><ProblemIndex /></Route>
      <Route exact path="/balances"><QuestionPage /></Route>
      <Route exact path="/login"><Login /></Route>

    </div>
  );
}

export default App;
