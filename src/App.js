import './styles/navbar.css';
import React, {useState, useEffect} from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';

import ProblemIndex from './pages/ProblemIndex';
import ChatModal from './components/ChatModal';

import logo from './icons/iCog-icon.svg';
import Login from './pages/LoginPage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const adminList = ['OLtaGG0AspajZBrsASkydh7m7L32'];

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
  const [isAdmin, setAdmin] = useState(false)

  const [chatSize, setChatSize] = useState("")
  
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
     // console.log('Authenticated', authenticated);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        const uuid = firebase.auth().currentUser.uid;
        console.log("user is " + uuid)
        if (adminList.includes(uuid)) {    
          setAdmin(true)
        } 
      } else {
        setAuthenticated(false);
        setAdmin(false)
      }      
    },
    );
  }, [authenticated]);

  function showChatModal(size) {
    setChatSize(size)
    setShowChat(true)    
   }

  return (       
    <div className='container'>

      <ChatModal showCModal={showChat} onClose={() => setShowChat(false)} size={chatSize} admin={isAdmin}/> 

       <div className="row">
        <nav className='navbar navbar-default navbar-expand-lg headingLine'>
          <div className="container-fluid ">
            <div className='navbar-header'>
              <img src={logo} alt='logo' width='50px'/>
            </div>
            <ul className="nav navbar-nav">              
              <li><Link to="/" className="nav-link custom-nav-link">Problem Index</Link></li>
              <li><Link to="/generator" className="disabled-link nav-link custom-nav-link">Problem Generator</Link></li>
              <li>{(authenticated) ? 
                <Link to="#" className="nav-link custom-nav-link" onClick={googleSignOut}>Sign Out, {getFirstNameFromGoogle()}{(isAdmin === true) ? ' (Admin User)' : ''}</Link> 
              : 
                <Link to="/login" className="nav-link custom-nav-link">Login Or Signup</Link>} 
                {(authenticated) ? <button className='chatFeature' onClick={() => showChatModal('xl', isAdmin)}><i class="fa fa-comment-dots fa-lg"></i></button> : <span></span>}</li>
            </ul>
          </div>
        </nav>        
      </div> 
      <div className="col-sm">
        {authenticated === true ?                    
          <div>
            <ProblemIndex admin={isAdmin}/>
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
