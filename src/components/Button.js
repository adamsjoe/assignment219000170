import React from 'react';
import { MathComponent } from 'mathjax-react'

function Button(props) {
  
  // determine if this is an answer button by checking if the isSubmit prop is checked
  let formulaButton;
  if (!props.isFormula) {
    formulaButton = false
  } else {
    formulaButton = true
  }

  // TODO
  // work out of this is a formula or a normal text answer 
  // (note this only works for kg answers - this would need
  // something better in future)
  let label = props.label;
  if (label.includes('kg')) {
    formulaButton = true
  }

  // need to handle if the button is regular text (ie no formula)

  const handleClick=()=>{
    // logic here…..
  };
  
  return (          
    <button className={props.className} onClick={handleClick} isFormula={props.isFormula}>
      {formulaButton === true ? <MathComponent tex={props.label} /> : props.label}
    </button>
  );
}

export default Button;
