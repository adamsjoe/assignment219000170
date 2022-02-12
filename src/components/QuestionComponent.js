import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function QuestionComponent() {

  const firestore = firebase.firestore();
  // const storage = firebase.storage();
  const collectionId = "Balances";
  const documentId = "Questions"
  
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getFirebase = async () => {
      const snapshot = await firestore.collection(collectionId).doc(documentId).get();
      const questionData = snapshot.data(); 
      
      setTitle(questionData.sectionTitle)
      setQuestionText(questionData.fullQuestion)
      setImageUrl(questionData.imageUrl)
    }
    getFirebase();
  },[firestore])
  
  return (
    <div className="col-sm">
    <h3 className="text-center">{title}</h3>
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