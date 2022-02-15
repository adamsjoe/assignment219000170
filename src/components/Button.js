import React from 'react';
import { MathComponent } from 'mathjax-react'

function Button(props) {
  
  // determine if this is an answer button by checking if the isSubmit prop is checked
  let answerBtn;
  if (!props.isSubmit) {
    answerBtn = true
  } else {
    answerBtn = false
  }

  // need to handle if the button is regular text (ie no formula)

  const handleClick=()=>{
    // logic here…..
  };
  
  return (          
    <button className={props.className} onClick={handleClick}>
      {answerBtn === true ? <MathComponent tex={props.label} /> : props.label}
    </button>
  );
}

export default Button;
