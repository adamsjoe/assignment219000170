import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import Button from '../components/Button';

function AnswerComponent() {

  const firestore = firebase.firestore();
  //const storage = firebase.storage();
  const collectionId = "Balances";
  const documentId = "Answers"

  const [answers, setAnswers] = useState([]);
  
  useEffect(() => {
    const getFirebase = async () => {
      const snapshot = await firestore.collection(collectionId).doc(documentId).get();
      const questionData = snapshot.data();      

      // create a new answer array
      const answerArr = [];
      
      // add the answer from cloud store to the answerArr
      Object.keys(questionData).forEach(key => {
        answerArr.push(questionData[key]);         
      });
      // set the answers to be the answersArray
      setAnswers(answerArr)      
    };
    getFirebase();
  },[firestore])

    
  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">        
        
        { 
        answers.map((answer, i) => {                            
          return (
            <div className="col-sm d-grid gap-2">
              <Button className='buttonAnswer mb-2 p-4' label={answer.text} correct={answer.correct}/>
            </div>
            )
          })
        }

        </div>
        <div className="col-sm text-center">
          <Button className='btn-primary mb-2 p-4' label='CHECK MY ANSWER' isFormula={false}/>
        </div>
      </div>
    </div>     
  )
}

export default AnswerComponent;