import React from 'react';
import AnswerGroup from '../components/Button';

function AnswerComponent(props) {

  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">        
                 
          <div className="col-sm d-grid gap-2">
            <AnswerGroup ans={props.answersarray}/>
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