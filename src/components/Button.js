import React from 'react';
import { MathComponent } from 'mathjax-react'

function Button(props) {
  const handleClick=()=>{
    // logic here…..
  };
  return (
    <button className={props.className} onClick={handleClick}>      
        <MathComponent tex={props.label} />
    </button>
  );
}

export default Button;
