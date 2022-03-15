import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { MathComponent } from 'mathjax-react'
import CheckAnswerModal from './CheckAnswerModal';
import '../styles/radioStyles.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';

function AnswerComponent(props) {
  let totalNoAnswers = props.totalAnswers;
  let answers = props.answersarray; 

  const db = firebase.firestore();   
  const firestore = firebase.firestore();   
  const collectionId = "Questions";
  const documentId = "balances";

  // state for the correct answer
  const [correctAnswer, setCorrectAnswer] = useState() 

  // state to show the congrats modal
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  // state to store the congrats url
  const [showCongratsURL, setShowCongratsURL] = useState("")

  // state to store window content
  const [showWindowContent, setShowWindowContent] = useState("")

  // the answerGroup - this is the document in firebase.
  const [selectedAnswerGroup, setSelectedAnswerGroup] = useState("")

  // get how many times the answer will have been clicked - TIL NOW
  const [chosenCount, setChosenCount]= useState()


  useEffect(() => {

  },[])

  function checkAnswer() {
    // we will need to show the modal, so set that true
    setShowCongratsModal(true)

    // now to check if we had selected the correct answer (or not)
    if (correctAnswer === true) {
      setShowCongratsURL("https://firebasestorage.googleapis.com/v0/b/assignment219000170.appspot.com/o/videos%2Fcongrat_w3_s.mp4?alt=media&token=034ea1bc-b3e0-4b51-957f-854dae963896")
    } else if (correctAnswer === false) {
      setShowWindowContent("Incorrect answer - please try again.")            
    } else {
      setShowWindowContent("Please choose an answer before proceeding.")            
    }
    
    // now we update the count only if the answer was correct
    if ((correctAnswer === true) || (correctAnswer === false)) {
    
      updateFirestore()
      .then((snapshot) => {
          console.log('updateFirestore() successfully called!');
          console.log(">", snapshot);
      })
      .catch((e) => {
          console.log(e);
      });
    }
  } 

// update firestore function
// set merge to true that way we can update the value
async function updateFirestore() {
    const db = firebase.firestore();   
    const collectionId = "Questions";
    const documentId = "balances";
        
    // we now need to update our count
    let newCount = chosenCount + 1
    
    // and set the state
    setChosenCount(newCount)


    const snapshot = db
    .collection(collectionId)
    .doc(documentId)
    .set(
    {      
        balances: {
            balances: {
                answers: {
                    [selectedAnswerGroup]: {
                        chosen: newCount
                    }
                }
            }
        }
    }, {merge: true});

    return snapshot;
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

  // using this comparison function will ensure that "none of the above" is always last on the list
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
              // let percentPicked = Math.round((timesPicked / getAnswers) * 100) // round this to a whole number - looks better than 1.22%
              let percentPicked = 0

              // otherwise 0% will show as NaN!
              percentPicked = parseInt(percentPicked) || 0

              // will need to work out if the label text will use the mathjax library - otherwise the "normal" text will look weird
              label.includes('kg') ? formulaButton = true : formulaButton = false;

              console.log(answer.text + " has been clicked " + answer.chosen + " times. And is it correct? " + answer.correct)

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