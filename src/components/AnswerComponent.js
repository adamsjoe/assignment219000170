import React, {useState} from 'react';
import { MathComponent } from 'mathjax-react'
import '../styles/radioStyles.css'

function AnswerComponent(props) {
  let answers = props.answersarray; 

  const [value, setValue] = useState(false)
  const [answerChosen, setAnswerChosen] = useState("")

  // function handleChange() {
  //   setValue(!value);
  //   alert(value)    
  // }

  function reportAnswer(e) {
    setAnswerChosen(e.target.value)
    console.log(">>  ", e.target.value)
    console.log(">>  ", typeof(e.target.value))
    console.log(">>> ", answerChosen)
    console.log(">>> ", typeof(answerChosen))
    console.log("-----------------------")
    // alert(answerChosen)
  }

  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">
          <div className="answerGroup">
            <fieldset value={answerChosen} onChange={(event) => reportAnswer(event)}>
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
                    // onChange={handleChange}
                    value={answer.correct}
                    // checked={reportAnswer === answer.correct}
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
          <button className='btn-primary mb-2 p-4'>CHECK MY ANSWER</button>
        </div>
      </div>
    </div>     
  )
}

export default AnswerComponent;