import React from 'react';
import Button from '../components/Button';

function AnswerComponent(props) {
  
  let answers = props.answersarray; 
  
  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">        
        
        { 
        answers.map((answer, i) => {                            
          return (
            <div className="col-sm d-grid gap-2">
              <Button className='buttonAnswer mb-2 p-4' label={answer.text} correct={answer.correct}/>
            </div>
            )
          })
        }

        </div>
        <div className="col-sm text-center">
          <Button className='btn-primary mb-2 p-4' label='CHECK MY ANSWER' isformula={false}/>
        </div>
      </div>
    </div>     
  )
}

export default AnswerComponent;