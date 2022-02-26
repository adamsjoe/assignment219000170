import React from 'react';

function QuestionComponent(props) {

  return (
    <div className="col-sm">
    <h3 className="text-center">Question</h3>
    <div className="p-3 mb-2 bg-light">
        <div className="text-center">
            <img className="mb-4 rounded img-fluid" src={props.image} alt={props.text}/>
        </div>
        <p>{props.text}</p>
    </div>
  </div>    
  )
}

export default QuestionComponent;