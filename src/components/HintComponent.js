import '../styles/customStyle.css';
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function HintComponent() {
  return (
    <div className="col-sm">
      <h3 className="text-center">Hints</h3>
      <div className="p-3 mb-2 bg-light">
          <div className="row">
              <div className="col-6 text-center">
                  <p className='headerGeneral'>General</p>
                  <div className="mb-5 d-grid gap-2 borderGeneral">
                      <button type="button" className="buttonGeneral">Primary</button>
                      <button type="button" className="buttonGeneral">Primary</button>                                    
                  </div>
                  <div className="mb-5 d-grid gap-2 borderGeneral">
                      <button type="button" className="buttonGeneral">Primary</button>
                      <button type="button" className="buttonGeneral">Primary</button>                                    
                  </div>
                  <div className="mb-5 d-grid gap-2 borderGeneral">
                      <button type="button" className="buttonGeneral">Primary</button>
                      <button type="button" className="buttonGeneral">Primary</button>                                    
                  </div>                                                                
              </div>
              <div className="col-6 text-center">
                  <p className='headerProblemSpecific'>Problem Specific</p>
                  <div className="mb-5 d-grid gap-2 borderProblemSpecific">
                      <button type="button" className="buttonProblemSpecific">Success</button>
                      <button type="button" className="buttonProblemSpecific">Success</button>                                    
                  </div>
                  <div className="mb-5 d-grid gap-2 borderProblemSpecific">
                      <button type="button" className="buttonProblemSpecific">Success</button>
                      <button type="button" className="buttonProblemSpecific">Success</button>                                    
                  </div>
                  <div className="mb-5 d-grid gap-2 borderProblemSpecific">
                      <button type="button" className="buttonProblemSpecific">Success</button>
                      <button type="button" className="buttonProblemSpecific">Success</button>                                    
                  </div>                                                                
              </div>
          </div>
      </div>
  </div>
  );
}

export default HintComponent;