import './styles/navbar.css';
import React, {useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';

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
  const firestore = firebase.firestore();
  const collectionId = "Questions";
  const documentId = "balances" 

  const [authenticated, setAuthenticated] = useState(false);

  // question things
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // answer things
  const [answers, setAnswers] = useState([]);

  useEffect(() => {    
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    const getFirebase = async () => {
      const snapshot = await firestore.collection(collectionId).doc(documentId).get();
      const questionData = snapshot.data();     
            
      setQuestionText(questionData.balances.balances.fullquestion.question) 
      setImageUrl(questionData.balances.balances.fullquestion.imageUrl) 

      // deal with the answers
      // create a new answer array
      const answerArr = []; 

      // add the answer from cloud store to the answerArr
      Object.keys(questionData.balances.balances.answers).forEach(key => {
        answerArr.push(questionData.balances.balances.answers[key]);         
      });
      // set the answers to be the answersArray
      setAnswers(answerArr) 
    }
    getFirebase();    
  }, [firestore]);  

  
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
      <Route exact path="/balances"><QuestionPage image={imageUrl} text={questionText} answerArray={answers}/></Route>      
      <Route exact path="/login"><Login /></Route>

    </div>
  );
}

export default App;
