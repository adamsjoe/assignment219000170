import React, {useState} from 'react';
import { MathComponent } from 'mathjax-react'
import VideoModal from './VideoModal';
import CheckAnswerModal from './CheckAnswerModal';
import '../styles/radioStyles.css'

function AnswerComponent(props) {
  let totalNoAnswers = props.totalAnswers;
  let answers = props.answersarray; 
  
  const [valueA, setValue] = useState()
  const [ansTrue, setAnsTrue] = useState("")
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showCongratsURL, setShowCongratsURL] = useState("")
  const [showWindowContent, setShowWindowContent] = useState("")

  function handleChange(val) {
    setValue(val);    
  }

  function checkAnswer() {   
    if (valueA === true) {
      // alert("you got the answer correct")
      setShowCongratsModal(true)
      setShowCongratsURL("https://firebasestorage.googleapis.com/v0/b/assignment219000170.appspot.com/o/videos%2Fcongrat_w3_s.mp4?alt=media&token=034ea1bc-b3e0-4b51-957f-854dae963896")
    } else if (valueA === false) {
      // alert("Epic sadness.  Try again")
      setShowCongratsModal(true)
      setShowWindowContent("Incorrect answer - please try again.")            
    } else {
      // alert("select an answer first!")
      setShowCongratsModal(true)
      setShowWindowContent("Please choose an answer before proceeding.")            
    }
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

  // valueA === true ? checkAnswerBtnClass = 'correctAnswer mb-2 p-4' : checkAnswerBtnClass = 'wrongAnswer mb-2 p-4'

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
              let percentPicked = (timesPicked / totalNoAnswers) * 100

              label.includes('kg') ? formulaButton = true : formulaButton = false;
                      
              return (
              <>
               <button className='buttonAnswer' id={id}>{formulaButton === true ? <><MathComponent tex={answer.text}/><span className='percentage mathjaxFakery'>{percentPicked}%</span></> : <>{answer.text}<span className='percentage'>{percentPicked}%</span></>}</button> 
              </>            
              )
            })
            }
            </fieldset>

          </div>          
        </div>
        <div className="row">
          <div className="col-sm text-center">
            <button className={'buttonCheck ' + (ansTrue === true ? 'correctAnswer' : '')}  onClick={checkAnswer}>CHECK MY ANSWER</button> <CheckAnswerModal showModal={showCongratsModal} onClose={() => setShowCongratsModal(false)} videoMessage={showCongratsURL} content={showWindowContent} size='med'/>
          </div>
        </div>
      </div>
    </div>     
  )
}


export default AnswerComponent;