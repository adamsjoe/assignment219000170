import React, {useState} from 'react';
import { MathComponent } from 'mathjax-react'
import VideoModal from './VideoModal';
import CheckAnswerModal from './CheckAnswerModal';
import '../styles/radioStyles.css'

function AnswerComponent(props) {
  let totalNoAnswers = props.totalAnswers;
  let answers = props.answersarray; 
  
  const [valueA, setValue] = useState() // make this mean something better
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showCongratsURL, setShowCongratsURL] = useState("")
  const [showWindowContent, setShowWindowContent] = useState("")
  const [selectedAnswerGroup, setSelectedAnswerGroup] = useState("")
  const [chosenCount, setChosenCount]= useState()

  // console.log(">>",answers)
  // function handleChange(val) {
  //   // setValue(val);   
  //  // alert(el)
  //  alert ("you chose " + selectedAnswerGroup)
  // }
  
  // const handleChange = (val,e) => {
  //   alert(e.target.value)
  // }

  function updateChosenCount() {
    // somehow update cloudstore when we have clicked the button with the right shit
  }

  function checkAnswer() {   
    // alert ("you chose " + selectedAnswerGroup)
    // alert ("the answer was picked " + chosenCount + " times")
    setShowCongratsModal(true)
    // set the selectedAnswer
    if (valueA === true) {
      setShowCongratsURL("https://firebasestorage.googleapis.com/v0/b/assignment219000170.appspot.com/o/videos%2Fcongrat_w3_s.mp4?alt=media&token=034ea1bc-b3e0-4b51-957f-854dae963896")
    } else if (valueA === false) {
      setShowWindowContent("Incorrect answer - please try again.")            
    } else {
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
  // console.log(answers)

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
              
              // console.log("XX ", answer )

              let formulaButton;
              let label = answer.text;
              let timesPicked = answer.chosen
              let percentPicked = (timesPicked / totalNoAnswers) * 100

              label.includes('kg') ? formulaButton = true : formulaButton = false;
                      
              return (
              <>
              <input type='radio'
                    name='answer'
                    id={id}
                    // onChange={() => handleChange(answer.correct)}                    
                    onChange={() => {setValue(answer.correct); setSelectedAnswerGroup(answer.key); setChosenCount(answer.chosen)}}                    
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