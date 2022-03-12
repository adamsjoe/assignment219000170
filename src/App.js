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

  const [questionTitle, setQuestionTitle] = useState();

  // question things
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // answer things
  const [answers, setAnswers] = useState([]);
  const [totalAnswers, setTotalAnswers] = useState(0);


  // hint things
  const [hintTitle, setHintTitle] = useState("");
  const [genColTitle, setGenColTitle] = useState("");
  const [specColTitle, setSpecColTitle] = useState("");

  const [hintDetails, setHintDetails] = useState([]);
  const [hintOverallSummary, setHintOverallSummary] = useState("");

  // states to handle hints
  const [problem_SVideo, setProblem_SVideo] = useState("")
  const [problem_SImage, setProblem_SImage] = useState("")

  const [spec_strat_balan_sVideo, setSpec_strat_balan_sVideo] = useState("")
  const [spec_strat_balan_sImage, setSpec_strat_balan_sImage] = useState("")

  const[mom_sVideo, setMom_sVideo] = useState("")
  const[mom_sImage, setMom_sImage] = useState("")

  const[specMom_sVideo, setSpecMom_sVideo] = useState("")
  const[specMom_sImage, setSpecMom_sImage] = useState("")

  const[gravity_sVideo, setGravity_sVideo] = useState("")
  const[gravity_sImage, setGravity_sImage] = useState("")

  const[specGravity_sVideo, setSpecGravity_sVideo] = useState("")
  const[specGravity_sImage, setSpecGravity_sImage] = useState("")

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

      // question component information
      // get and set the question title
      setQuestionTitle(questionData.balances.balances.questions.title)

      // get and set the question text and image
      setQuestionText(questionData.balances.balances.fullquestion.question) 
      setImageUrl(questionData.balances.balances.fullquestion.imageUrl) 

      // answer component info
      // create a new answer array
      const answerArr = []; 
      let selectedAnswers = 0 

      // add the answer from firestore to the answerArr
      Object.keys(questionData.balances.balances.answers).forEach(key => {
        answerArr.push(questionData.balances.balances.answers[key]);         
        // console.log(questionData.balances.balances.answers[key].chosen)
        selectedAnswers += questionData.balances.balances.answers[key].chosen
      });
      // set the answers to be the answersArray
      setAnswers(answerArr) 
      setTotalAnswers(selectedAnswers)

      // hint component info
      // get and set hint title 
      setHintTitle(questionData.balances.balances.hint.titleColumn.title_1.columnTitle)
      
      // get and set general column title 
      setGenColTitle(questionData.balances.balances.hint.titleColumn.title_2.columnTitle)

      // get and set problem specific column title 
      setSpecColTitle(questionData.balances.balances.hint.titleColumn.title_3.columnTitle)

      // problem_s 
      setProblem_SVideo(questionData.balances.balances.hint.video.video_1.videoUrl)
      setProblem_SImage(questionData.balances.balances.hint.video.video_1.image)

      // spec_strat_balan_s
      setSpec_strat_balan_sVideo(questionData.balances.balances.hint.video.video_2.videoUrl)
      setSpec_strat_balan_sImage(questionData.balances.balances.hint.video.video_2.image)

      // mom_s
      setMom_sVideo(questionData.balances.balances.hint.video.video_3.videoUrl)
      setMom_sImage(questionData.balances.balances.hint.video.video_3.image)

      // spec_mom_s
      setSpecMom_sVideo(questionData.balances.balances.hint.video.video_4.videoUrl)
      setSpecMom_sImage(questionData.balances.balances.hint.video.video_4.image)

      // gravity_s
      setGravity_sVideo(questionData.balances.balances.hint.video.video_5.videoUrl)
      setGravity_sImage(questionData.balances.balances.hint.video.video_5.image)

      // spec_gravity_s
      setSpecGravity_sVideo(questionData.balances.balances.hint.video.video_6.videoUrl)
      setSpecGravity_sImage(questionData.balances.balances.hint.video.video_6.image)

    }
    getFirebase();    
  }, [firestore]
  );  

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

      <Route exact path="/">
        <ProblemIndex />
      </Route>
      <Route exact path="/balances">
        <QuestionPage questionTitle={questionTitle}
                      image={imageUrl} 
                      text={questionText} 
                      answers={answers}
                      totAnswered={totalAnswers}
                      hintColHeading={hintTitle}
                      genColHeading={genColTitle}
                      specColHeading={specColTitle}
                      hintData={hintDetails}
                      prob_s_vid={problem_SVideo}                      
                      prob_s_im= {problem_SImage}
                      spec_strat_balan_sImage={spec_strat_balan_sImage}
                      spec_strat_balan_sVideo={spec_strat_balan_sVideo}
                      mom_s_image={mom_sImage}
                      mom_s_video={mom_sVideo}
                      spec_mom_s_image={specMom_sImage}
                      spec_mom_s_video={specMom_sVideo}
                      gravity_sImage={gravity_sImage}
                      gravity_sVideo={gravity_sVideo}
                      specGravity_sImage={specGravity_sImage}
                      specGravity_sVideo={specGravity_sVideo}                      
        />
      </Route>      
      <Route exact path="/login">
        <Login />
      </Route>

    </div>
  );
}

export default App;
