import '../styles/customStyle.css';
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import Button from './Button';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function HintComponent() {
    const firestore = firebase.firestore();
    // const storage = firebase.storage();
    const collectionId = "Questions";
    const questionId = "balances";
  
    const [title, setTitle] = useState("");
    const [genColumnnTitle, setGenColumnTitle] = useState("");
    const [specificProblemColumnTitle, setSpecificProblemColumnTItle] = useState("");

    useEffect(() => {
        const getFirebase = async () => {
            const snapshot = await firestore.collection(collectionId).doc(questionId).get();
            const questionData = snapshot.data();

            setTitle(questionData[questionId].balances.hintColumn.columnTitle)
            setGenColumnTitle(questionData[questionId].balances.hintColumn.generalColumnTitle)
            setSpecificProblemColumnTItle(questionData[questionId].balances.hintColumn.specificColumnTitle)            
        }
        getFirebase();
    },[firestore])    

  return (
    <div className="col-sm">
      <h3 className="text-center">{title}</h3>
      <div className="p-3 mb-2 bg-light">
          <div className="row">
              <div className="col-6 text-center">
                  <p className='headerGeneral'>{genColumnnTitle}</p>
                  <div className="mb-5 d-grid gap-2 borderGeneral">
                      <Button className="buttonGeneral" label='Primary' />
                      <Button className="buttonGeneral" label='Primary' />
                  </div>
                  <div className="mb-5 d-grid gap-2 borderGeneral">
                      <Button className="buttonGeneral" label='Primary' />
                      <Button className="buttonGeneral" label='Primary' />
                  </div>
                  <div className="mb-5 d-grid gap-2 borderGeneral">
                      <Button className="buttonGeneral" label='Primary' />  
                      <Button className="buttonGeneral" label='Primary' />
                  </div>                                                                
              </div>
              <div className="col-6 text-center">
                  <p className='headerProblemSpecific'>{specificProblemColumnTitle}</p>
                  <div className="mb-5 d-grid gap-2 borderProblemSpecific">
                    <Button className="buttonProblemSpecific" label='Success' />  
                    <Button className="buttonProblemSpecific" label='Success' />                                
                  </div>
                  <div className="mb-5 d-grid gap-2 borderProblemSpecific">
                    <Button className="buttonProblemSpecific" label='Success' />  
                    <Button className="buttonProblemSpecific" label='Success' />                                
                  </div>
                  <div className="mb-5 d-grid gap-2 borderProblemSpecific">
                    <Button className="buttonProblemSpecific" label='Success' />  
                    <Button className="buttonProblemSpecific" label='Success' />                                
                </div>                                                                
              </div>
          </div>
      </div>
  </div>
  );
}

export default HintComponent;