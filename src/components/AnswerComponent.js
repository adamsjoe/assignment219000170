import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { MathComponent } from 'mathjax-react'

function AnswerComponent() {

  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const collectionId = "Questions";
  const questionId = "balances";

  const [answer_1, setAnwser_1] = useState("");
  
  useEffect(async () => {
    const snapshot = await firestore.collection(collectionId).doc(questionId).get();
    const questionData = snapshot.data();

    // find the number of answers
    // let answer_1 = questionData[questionId].balances.questions.fullquestion.answers.ans_1.text;
    setAnwser_1(questionData[questionId].balances.questions.fullquestion.answers.ans_1.text)

    const testForm = `\\[ 10 \\mbox{ kg.} \\]`

  },[])

  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
          <div className="row">
              <div className="col-sm d-grid gap-2">                
                  <button type="button" className="buttonAnswer"><MathComponent tex={answer_1} /></button>    
                  <button type="button" className="buttonAnswer">Secondary</button>
              </div>
              <div className="col-sm d-grid gap-2">
                  <button type="button" className="buttonAnswer">Secondary</button>
                  <button type="button" className="buttonAnswer">Secondary</button>
              </div>                            
          </div>  
          <div className="row">
              <div className="col-sm text-center">
                  <button type="button" className="btn btn-primary mb-2 p-4">Primary</button>
              </div>
          </div>                      
      </div>
    </div>     
  )
}

export default AnswerComponent;