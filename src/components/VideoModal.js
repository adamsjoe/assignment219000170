import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function VideoModal({showVModal = false, onClose = () =>{}, videoMessage, size, firebaseDocument}) {
  
  const firestore = firebase.firestore();

  const [confused, setConfused] = useState(false)
  const [text, setText] = useState("");
  
  const [localMessages, setLocalMessages] = useState([]);
  const [userId, setUserId] = useState('');
  
  const [sendMessageLocked, setSendMessageLocked] = useState(false)

  if (showVModal) {
    console.log("Video Modal ", firebaseDocument)
  }

  useEffect(() => {    
    if (showVModal) {
      const query = firestore.collection(firebaseDocument).orderBy('timestamp', 'desc'); // would want this desc - but get something back first
      // console.log(query)
      query.onSnapshot({
        next: (querySnapshot) => {
          // eslint-disable-next-line prefer-const
          let messages = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            messages.push({mid: doc.id, ...doc.data()});
          });
          setLocalMessages(messages);
        },
      });  
    }
    }, [firebaseDocument, firestore, showVModal]
  );  


  // function checkIfChatShouldBeLocked() {
  //   if (showVModal) {
  //     // this returns the milliseconds since jan 1 1970
  //     const now = Date.now()
      
  //     // this will work out what the milliseconds will be in 3 days
  //     const threeDaysHence = now + (1000 * 60 * 60 * 24 * 3) 

  //     // we also need to get who the current user is and who the last message user was
  //     const lastMessageUser = localMessages[0].uuid
  //     const currentUser = firebase.auth().currentUser.uid

  //     if (currentUser != lastMessageUser) {
  //       // the users do not match - so can post away
  //     }
  //     else {
  //       console.log("Current user posted last message... in the " + firebaseDocument)
  //       if (now <=threeDaysHence) {
  //         console.log("  -> last message was posted less than 3 days ago.  Come back later")
  //         // return true
  //       } else {
  //         console.log("  -> keyboard warriors can resume their work")
  //         // return false
  //       }
  //     }
  //   } else {
  //     // nothing
  //   }
  // }

  // checkIfChatShouldBeLocked();

  return (    
    <Modal
      size={size}
      show={showVModal} 
      onHide={onClose}
      onClose={()=>setConfused(false)}
      backdrop="static"
      keyboard={false}
      onSubmit={onClose}
    >

    <Modal.Body>          
      <video src={videoMessage} controls autoPlay></video> 
      <div>     
        {confused ? (
        <form onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit clicked")
          const timestamp = Date.now()
          const content = text;
          const uuid = firebase.auth().currentUser.uid

          const message = {content, timestamp, uuid}              
          const docRef = await firestore.collection(firebaseDocument).add(message);
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
        ) : (
        <div>
          <Button className="confusedBtn" onClick={()=>setConfused(true)}>
            Confused?
          </Button>
        </div>
      )}
      </div>
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => {onClose(); setConfused(false)}}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default VideoModal
