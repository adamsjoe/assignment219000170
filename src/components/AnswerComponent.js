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

  const [answers, setAnwsers] = useState([]);

  useEffect(() => {
    const getFirebase = async () => {
      const snapshot = await firestore.collection(collectionId).doc(documentId).get();
      const questionData = snapshot.data();      

      // now we add the answers and correct flag to our answers
      const answerArr = [];
      Object.keys(questionData).forEach(key => {
        answerArr.push(questionData[key]); 
      });
      setAnwsers(answerArr)      
    };
    getFirebase();
  },[firestore])

  console.log(">>", answers)
  
  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
      <div className="row">
        
      </div>
        { answers.map((answer, i) => {
          return (<Button className='btn btn-secondary mb-2 p-4' label={answer.text} correct={answer.correct}/>)
        })
        }
      </div>
    </div>     
  )
}

export default AnswerComponent;