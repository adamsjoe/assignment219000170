import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function QuestionComponent() {

  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const collectionId = "Questions";
  const questionId = "balances";

  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  useEffect(async () => {
    const snapshot = await firestore.collection(collectionId).doc(questionId).get();
    const questionData = snapshot.data();
    setTitle(questionData[questionId].balances.questions.title)
    setQuestionText(questionData[questionId].balances.questions.fullquestion.question)
    setImageUrl(questionData[questionId].balances.questions.fullquestion.questionImage)
  })
  return (
    <div className="col-sm">
    <h3 className="text-center">Question</h3>
    <div className="p-3 mb-2 bg-light">
        <div className="text-center">
            <img className="mb-4 rounded img-fluid" src={imageUrl} alt={questionText}/>
        </div>
        <p>{questionText}</p>
    </div>
  </div>    
  )
}

export default QuestionComponent;