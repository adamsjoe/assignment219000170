import '../styles/customStyle.css';
import React, {useEffect, useState} from 'react';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import ModalReact from './ModalReact';

function HintComponent(props) {

  console.log(">>> ", props.image_1)
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="col-sm">
      <h3 className="text-center">{props.titleCol}</h3>
      <div className="p-3 mb-2 bg-light ">
          <div className="row">
            <div className="col-2 text-center">
              <p><br/></p>    
            </div>            
            <div className="col-5 text-center">
              <p className='headerGeneral'>{props.genCol}</p>    
            </div>
            <div className="col-5 text-center">
              <p className='headerProblemSpecific'>{props.specCol}</p>    
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2">
              <p>Overall solution strategy</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <button className="buttonGeneral">VIDEO</button> 
              <button className="buttonGeneral" onClick={()=>setShowModal(true)}>SUMMARY11</button> <ModalReact showModal={showModal} onClose={() => setShowModal(false)} image={props.image_1} />
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <button className="buttonProblemSpecific">VIDEO</button> 
              <button className="buttonProblemSpecific">SUMMARY</button>                            
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2">
              <p>Moments</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
            <button className="buttonGeneral">VIDEO</button> 
              <button className="buttonGeneral">'SUMMARY</button>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
            <button className="buttonProblemSpecific">VIDEO</button> 
              <button className="buttonProblemSpecific">SUMMARY</button>                             
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2">
              <p>Gravity</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
            <button className="buttonGeneral">VIDEO</button>
              <button className="buttonGeneral">SUMMARY</button>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
            <button className="buttonProblemSpecific">VIDEO</button>
              <button className="buttonProblemSpecific">SUMMARY</button>                               
            </div>            
          </div>

      </div>
  </div>
  );
}

export default HintComponent;