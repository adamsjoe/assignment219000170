import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { MathComponent } from 'mathjax-react'
import Button from '../components/Button';

function AnswerComponent() {

  const firestore = firebase.firestore();
  //const storage = firebase.storage();
  const collectionId = "Balances";
  const documentId = "Answers"

  const [answers, setAnwsers] = useState([]);
  let count = null;

  useEffect(async () => {
    const snapshot = await firestore.collection(collectionId).doc(documentId).get();
    const questionData = snapshot.data();
     
    if (questionData) {
      Object.entries(questionData).map(([key, value]) => {
        // console.log("key is '" + key + "' correct is '" + value.correct + "'")
        // buttonArray[count] = "<button>" + value.text + "</button>"
        count++;
      })

    }
    // count = generateButtons(questionData);
    
  },[firestore])

  function generateButtons(dataForQuestions) {
    const Test = ({dataForQuestions}) => (
      <div>
        {dataForQuestions.map(question => (
          <Button className="col-sm d-grid gap-2" correct={question.correct}>{question.text}</Button>
        ))}
      </div>
    ); 

    return Test;
  }
  
  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
      <div className="row">
        
      </div>
        {count}
          {/* <div className="row">
              <div className="col-sm d-grid gap-2">                
                <Button label={<MathComponent tex={answer_1} />} className='buttonAnswer' />
                <Button label={<MathComponent tex={answer_1} />} className='buttonAnswer' />
              </div>
              <div className="col-sm d-grid gap-2">
                <Button label={<MathComponent tex={answer_1} />} className='buttonAnswer' />
                <Button label={<MathComponent tex={answer_1} />} className='buttonAnswer' />
              </div>                            
          </div>  
          <div className="row">
              <div className="col-sm d-grid text-center">
                <div className='answerSpace'>
                    <button type="button" className="buttonCheck">Check my answer</button>
                  </div>
              </div>
          </div>                       */}
      </div>
    </div>     
  )
}

export default AnswerComponent;