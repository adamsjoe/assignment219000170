import React, {useState} from 'react';
import { MathComponent } from 'mathjax-react'
import '../styles/radioStyles.css'

function AnswerGroup(props) {
  let answers = props.ans; 
  // console.log("> ", answers)
  const [value, setValue] = useState(false)
  // const [isActive, setActive] = useState(false)

  function handleChange() {
    setValue(value);
    // alert(value)    
  }

  // const toggleClass = () => {
  //   setActive(!isActive);
  // };

  
  return (      
    <div className="answerGroup">
      {
        answers.map((answer, id) => {

          let formulaButton;
          let label = answer.text;
          
          label.includes('kg') ? formulaButton = true : formulaButton= false;
          
          return (
            <>            
              <input type='radio'
                    //  className={isActive ? 'radBtn' : 'selectedAnswer'}
                     className={'radBtn'}
                    //  checked={value}
                     name='answer'
                     id={id}
                     onChange={handleChange}
                     value={answer.correct}
              />
              <label for={id}>{formulaButton === true ? <MathComponent tex={answer.text} /> :answer.text}</label>
            </>            
          )
        })
      }
    </div>
  )
}

export default AnswerGroup;


