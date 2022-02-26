import '../styles/customStyle.css';
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import Button from './Button';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function HintComponent() {
    const firestore = firebase.firestore();
    // const storage = firebase.storage();
    const collectionId = "Balances";
    const documentId = "Hints"
  
    const [title, setTitle] = useState("");
    const [genColumnnTitle, setGenColumnTitle] = useState("");
    const [specificProblemColumnTitle, setSpecificProblemColumnTItle] = useState("");

    useEffect(() => {
        const getFirebase = async () => {
          const snapshot = await firestore.collection(collectionId).doc(documentId).get();
          const questionData = snapshot.data(); 

          setTitle(questionData.sectionTitle)
          setGenColumnTitle(questionData.generalColumnTitle)
          setSpecificProblemColumnTItle(questionData.specificColumnTitle)            
        }
        getFirebase();
    },[firestore])    

  return (
    <div className="col-sm">
      <h3 className="text-center">{title}</h3>
      <div className="p-3 mb-2 bg-light ">
          <div className="row">
            <div className="col-2 text-center">
              <p><br/></p>    
            </div>            
            <div className="col-5 text-center">
              <p className='headerGeneral'>{genColumnnTitle}</p>    
            </div>
            <div className="col-5 text-center">
              <p className='headerProblemSpecific'>{specificProblemColumnTitle}</p>    
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2 yrc">
              <p>Overall solution strategy</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <Button className="buttonGeneral" label='VIDEO' />
              <Button className="buttonGeneral" label='SUMMARY' />
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <Button className="buttonProblemSpecific" label='VIDEO' />  
              <Button className="buttonProblemSpecific" label='SUMMARY' />                                
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2 yrc">
              <p>Moments</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <Button className="buttonGeneral" label='VIDEO' />
              <Button className="buttonGeneral" label='SUMMARY' />
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <Button className="buttonProblemSpecific" label='VIDEO' />  
              <Button className="buttonProblemSpecific" label='SUMMARY' />                                
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2 yrc">
              <p>Gravity</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <Button className="buttonGeneral" label='VIDEO' />
              <Button className="buttonGeneral" label='SUMMARY' />
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <Button className="buttonProblemSpecific" label='VIDEO' />  
              <Button className="buttonProblemSpecific" label='SUMMARY' />                                
            </div>            
          </div>

      </div>
  </div>
  );
}

export default HintComponent;