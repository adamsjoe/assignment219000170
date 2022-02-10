import React from 'react';

function Button(props) {
  const handleClick=()=>{
    // logic here…..
  };
  return (
    <button className={props.className} onClick={handleClick}>
       {props.label}
    </button>
  );
}

export default Button;
