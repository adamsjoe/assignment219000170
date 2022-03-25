import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



function Confused(fbd) {
  
  const firestore = firebase.firestore();
  const [text, setText] = useState("");
  const [confused, setConfused] = useState(false);
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      console.log("submit clicked")
      const timestamp = Date.now()
      const content = text;
      const uuid = firebase.auth().currentUser.uid

      const message = {content, timestamp, uuid}              
      const docRef = await firestore.collection(fbd).add(message);
      setText('')     
      
    }}>
      <div>
        What have you found confusing about this video?
        <textarea className='confusedText' 
                  rows="2"
                  value={text}
                  onChange={(value) => {
                    setText(value.target.value);
                  }}>
        </textarea>          
        <Button className="confusedBtnSave" type='Submit'>
          Save
        </Button>
        <Button className="confusedBtnCancel" onClick={()=>setConfused(false)}>
          Cancel
        </Button>          
      </div>
    </form>
  )
}

export default Confused