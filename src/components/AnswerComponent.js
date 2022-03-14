import React, {useEffect, useState} from 'react';
import { MathComponent } from 'mathjax-react'
import CheckAnswerModal from './CheckAnswerModal';
import '../styles/radioStyles.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';

function AnswerComponent(props) {
  // let totalNoAnswers = props.totalAnswers;
  // let answers = props.answersarray; 

  const db = firebase.firestore();   
  const firestore = firebase.firestore();   
  const collectionId = "Questions";
  const documentId = "balances";

  const [correctAnswer, setCorrectAnswer] = useState() 
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showCongratsURL, setShowCongratsURL] = useState("")
  const [showWindowContent, setShowWindowContent] = useState("")
  const [selectedAnswerGroup, setSelectedAnswerGroup] = useState("")
  const [chosenCount, setChosenCount]= useState()

  const [answers, setAnswers] = useState([]);

  const [getAnswers, setTotalAnswers] = useState()

  useEffect(() => {
    const getFirebase = async () => {
      const snapshot = await firestore.collection(collectionId).doc(documentId).get();
      const questionData = snapshot.data();      

      // now we add the answers and correct flag to our answers
      const answerArr = [];
      let selectedAnswers = 0 
      Object.keys(questionData.balances.balances.answers).forEach(key => {        
        const obj = questionData.balances.balances.answers[key]

        // will need to know which document the database holds the chosen info, so let's add it to the array
        obj['key'] = key
        answerArr.push(obj);         

        // count the number of times answers were "picked", (i.e. chosen)
        selectedAnswers += questionData.balances.balances.answers[key].chosen
      });

      setAnswers(answerArr)    
      setTotalAnswers(selectedAnswers)  

    };
    getFirebase();
  },[firestore])

  function checkAnswer() {   
    setShowCongratsModal(true)
    if (correctAnswer === true) {
      setShowCongratsURL("https://firebasestorage.googleapis.com/v0/b/assignment219000170.appspot.com/o/videos%2Fcongrat_w3_s.mp4?alt=media&token=034ea1bc-b3e0-4b51-957f-854dae963896")
    } else if (correctAnswer === false) {
      setShowWindowContent("Incorrect answer - please try again.")            
    } else {
      setShowWindowContent("Please choose an answer before proceeding.")            
    }

    const updateFirestore = async () => {
     
      console.log(selectedAnswerGroup);
      console.log(chosenCount);
      let newCount = chosenCount + 1

      const snapshot = db.collection(collectionId).doc(documentId).set({
        balances: {
          balances: {
            answers: {
              [selectedAnswerGroup]: {
                chosen: newCount
              }
            }
          }
        }
      }, {merge: true})
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    }
    updateFirestore()    
  }

  function compare(a, b) {
    if ( a.text < b.text ){
      return -1;
    }
    if ( a.text > b.text ){
      return 1;
    }
    return 0;
  }

  answers.sort(compare);

  // correctAnswer === true ? checkAnswerBtnClass = 'correctAnswer mb-2 p-4' : checkAnswerBtnClass = 'wrongAnswer mb-2 p-4'

  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">
          <div className="answerGroup">
            <fieldset>
            {
                      
            answers.map((answer, id) => {              

              let formulaButton;
              let label = answer.text;
              let timesPicked = answer.chosen
              let percentPicked = Math.round((timesPicked / getAnswers) * 100) // round this to a whole number - looks better than 1.22%

              // otherwise 0% will show as NaN!
              percentPicked = parseInt(percentPicked) || 0

              label.includes('kg') ? formulaButton = true : formulaButton = false;

              return (
              <>
              <input type='radio'
                    name='answer'
                    id={id}
                    onChange={() => {setCorrectAnswer(answer.correct); setSelectedAnswerGroup(answer.key); setChosenCount(answer.chosen)}}                    
                    value={answer.correct}
              />
              <label htmlFor={id}>{formulaButton === true ? <MathComponent tex={answer.text} /> : <div className='mathjaxFakery'>{answer.text}</div>}<span className='percentage'>{percentPicked}%</span></label>
              </>
              )
            })
            }
            </fieldset>

          </div>          
        </div>
        <div className="row">
          <div className="col-sm text-center">
            <button className='buttonCheck' onClick={checkAnswer}>CHECK MY ANSWER</button> <CheckAnswerModal showModal={showCongratsModal} onClose={() => setShowCongratsModal(false)} videoMessage={showCongratsURL} content={showWindowContent} size='med'/>
          </div>
        </div>
      </div>
    </div>     
  )
}

export default AnswerComponent; 