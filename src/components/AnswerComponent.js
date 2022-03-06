import React, {useState} from 'react';
import { MathComponent } from 'mathjax-react'
import '../styles/radioStyles.css'

function AnswerComponent(props) {
  let answers = props.answersarray; 

  const [valueA, setValue] = useState(false)

  function handleChange(val) {
    setValue(val);
  }

  function showRight() {
    alert(valueA)  
  }

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
                    className={'radBtn'}                    
                    name='answer'
                    id={id}
                    onChange={() => handleChange(answer.correct)}
                    value={answer.correct}
              />
              <label for={id}>{formulaButton === true ? <MathComponent tex={answer.text} /> :answer.text}</label>
              </>            
              )
            })
            }
            </fieldset>
          </div>          
        </div>
        <div className="col-sm text-center">
          <button className='btn-primary mb-2 p-4' onClick={showRight}>CHECK MY ANSWER</button>
        </div>
      </div>
    </div>     
  )
}

export default AnswerComponent;