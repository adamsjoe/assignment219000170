import React from 'react';
import '../styles/customStyle.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {getFirstNameFromGoogle} from '../helper/utils';


// if this user is a student, then show the confused.  If not a student, then don't - should admins be able to send admins messages?

function VideoModal({showVModal = false, onClose = () =>{}, videoMessage, size, firebaseDocument, admin}) {
  const firestore = firebase.firestore();

  const [confused, setConfused] = useState(false);
  const [text, setText] = useState('');

  const [localMessages, setLocalMessages] = useState([]);

  const [FAQMessages, setFAQMessages] = useState([]);

  function showLockedThread() {
    const usersName = getFirstNameFromGoogle();

    return (
      <div id='lockedThread'>
        {usersName[0]}, please wait <b>3</b> days before asking more questions. <br/>
      </div>
    );
  }

  function getFirstNameFromGoogle() {
    const user = firebase.auth().currentUser;
    const names = user.displayName.split(' ');
    return names;
  }

  function showConfusedForm() {
    return (
      <form onSubmit={async (e) => {
        e.preventDefault();
        console.log('submit clicked');
        const chatsDoc = 'chats';

        // these are the fields we need (or will need) for the message
        const timestamp = Date.now();
        const content = text;
        const uuid = firebase.auth().currentUser.uid;
        const userName = getFirstNameFromGoogle();
        const type = 'StudentQuery'; // identifies this as a query from a student
        // const repliedTo = false
        const addedToFAQ = false;
        const video = firebaseDocument;
        const image = '';
        const isAdmin = admin;

        // const message = {content, timestamp, uuid, type, repliedTo, addedToFAQ, video, image}
        const message = {content, timestamp, uuid, type, addedToFAQ, video, userName, isAdmin, image};
        // const docRef = await firestore.collection(firebaseDocument).add(message);
        const docRef = await firestore.collection(chatsDoc).add(message);
        setText('');
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
    );
  }

  /* this seems crappy */
  useEffect(() => {
    if (showVModal) {
      const query = firestore.collection('chats').where('video', '==', firebaseDocument).orderBy('timestamp', 'desc');

      query.onSnapshot({
        next: (querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            messages.push({mid: doc.id, ...doc.data()});
          });
          setLocalMessages(messages);
        },
      });
    } else {

    }
  }, [firebaseDocument, firestore, showVModal],
  );

  useEffect(() => {
    const query = firestore.collection('chats').where('video', '==', firebaseDocument).where('addedToFAQ', '==', true).orderBy('timestamp', 'desc');
    console.log(query);
    query.onSnapshot({
      next: (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({mid: doc.id, ...doc.data()});
        });
        setFAQMessages(messages);
      },
    });
  }, [firebaseDocument, firestore]);


  function checkIfChatShouldBeLocked() {
    console.log('In checkIfChatShouldBeLocked');

    if (showVModal) {
      // this returns the milliseconds since jan 1 1970
      const now = Date.now();

      // this will work out what the milliseconds will be in 3 days
      const threeDaysHence = now + (1000 * 60 * 60 * 24 * 3);

      // we also need to get who the current user is and who the last message user was
      if (localMessages.length === 0) {
        // there is no last message, so return a false
        return false;
      }

      const lastMessageUser = localMessages[0].uuid;
      const currentUser = firebase.auth().currentUser.uid;

      if (currentUser !== lastMessageUser) {
        // the users do not match - so can post away
      } else {
        console.log('Current user posted last message in the ' + firebaseDocument);
        if (now <=threeDaysHence) {
          console.log('  -> last message was posted less than 3 days ago.  Come back later');
          return true;
        } else {
          console.log('  -> keyboard warriors can resume their work');
          return false;
        }
      }
    } else {
      // nothing
    }
  }

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
        <div className='FAQVideoModal'>
          <div className='FAQ'>
            <h4 className='text-center'>FAQ section</h4>
            {FAQMessages.map((localMessage) => (
              <div className='FAQUserLayout userOtherLayout'>
                <div className='user userOther'>
                  <p className='chatUser'>{localMessage.userName[0]} {localMessage.userName[1]}</p>
                  <p>{localMessage.content}</p>
                  { localMessage?.image && localMessage.image.length > 0 && <img style={{width: '100%', height: 'auto', marginBottom: 24}} src={localMessage.image} alt='chat' />  }
                  <p className='chatTimestamp'><b>Sent:</b> {new Date(localMessage.timestamp).toLocaleTimeString()}, {new Date(localMessage.timestamp).toDateString() }</p>
                </div>
              </div>
            ))}

          </div>
          <div className='videoSection'>
            <video src={videoMessage} controls autoPlay></video>
            <div className='vid'>
              {confused ? (
            checkIfChatShouldBeLocked() ? showLockedThread() : showConfusedForm()
            ) : (
            <div>
              <Button className="confusedBtn" onClick={()=>setConfused(true)}>
                Confused?
              </Button>
            </div>
          )}
            </div>
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          onClose(); setConfused(false);
        }}>
        Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VideoModal;
