import React, {useState} from 'react';
import { MathComponent } from 'mathjax-react'
import '../styles/radioStyles.css'

function AnswerComponent(props) {
  let answers = props.answersarray; 
  
  const [valueA, setValue] = useState()
  const [ansTrue, setAnsTrue] = useState("")
  
  function handleChange(val) {
    setValue(val);    
  }

  function checkAnswer() {   
    if (valueA === true) {
      alert("you got the answer correct")
      setAnsTrue(true)
    } else if (valueA === false) {
      alert("Epic sadness.  Try again")
    } else {
      alert("select an answer first!")
    }
  }

  function compare(a, b) {
    if ( a.last_nom < b.last_nom ){
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

              label.includes('kg') ? formulaButton = true : formulaButton = false;
                      
              return (
              <>
              <input type='radio'
                    // className={'radBtn'}                    
                    name='answer'
                    id={id}
                    onChange={() => handleChange(answer.correct)}
                    value={answer.correct}
              />
              <label for={id}>{formulaButton === true ? <MathComponent tex={answer.text} /> : answer.text}</label>
              </>            
              )
            })
            }
            </fieldset>
          </div>          
        </div>
        <div className="row">
          <div className="col-sm text-center">
            <button className={'buttonCheck ' + (ansTrue === true ? 'correctAnswer' : '')}  onClick={checkAnswer}>CHECK MY ANSWER</button>
          </div>
        </div>
      </div>
    </div>     
  )
}


export default AnswerComponent;