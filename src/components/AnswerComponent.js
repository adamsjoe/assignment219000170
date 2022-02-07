import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function AnswerComponent() {

  function getMappedValues(map) {
    var tempMap = {};
    for (const [key, value] of Object.entries(map)) {
        tempMap[key] = value;
    }
    return tempMap;
}

  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const collectionId = "Questions";
  const questionId = "balances";

  // const [title, setTitle] = useState("");
  // const [questionText, setQuestionText] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  
  useEffect(async () => {
    const snapshot = await firestore.collection(collectionId).doc(questionId).get();
    const questionData = snapshot.data();
    // setTitle(questionData[questionId].balances.questions.title)
    // setQuestionText(questionData[questionId].balances.questions.fullquestion.question)
    // setImageUrl(questionData[questionId].balances.questions.fullquestion.questionImage)

    // find the number of answers
    let answers = questionData[questionId].balances.questions.fullquestion.answer.length
    console.log("Ans: ", answers)

    console.log(getMappedValues(questionData[questionId].balances.questions.fullquestion.answer.answer_1))
  })

  return (
    <div className="col-12">
      <h3 className="text-center">Answer</h3>
      <div className="p-3 mb-2 bg-light">
          <div className="row">
              <div className="col-sm d-grid gap-2">
                  <button type="button" className="buttonAnswer">Secondary</button>
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