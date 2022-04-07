/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/chatroom.css'

function ChatModal({showCModal = false, onClose = () =>{}, size}) {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  
  useEffect(() => {
    setUserId(firebase.auth()?.currentUser?.uid);
    // const query = firestore.collection('chats').orderBy('timestamp', 'asc');
    const query = firestore.collection('chats').where("video", "==", 'problem_s').orderBy("timestamp", "desc");      
    query.onSnapshot({
      next: (querySnapshot) => {
        let messages = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          messages.push(doc.data());
        });
        setLocalMessages(messages)
      }
    });
  }, [firestore]);

  return (
    <Modal
      size={size}
      show={showCModal} 
      onHide={onClose}
      backdrop="static"
      keyboard={false}    
    >

    <Modal.Body>
      <Tabs>
        <TabList>
           <Tab>Gen Problem Solving</Tab> {/* (problem_s) */}
          <Tab>Spec Balances Problem</Tab> {/* (spec_strat_balan_s) */}
          <Tab>Gen Moments</Tab> {/* (mom_s) */}
          <Tab>Spec Moments</Tab> {/* (spec_mom_s) */}
          <Tab>Gen Gravity</Tab> {/* (gravity_s) */}
          <Tab>Spec Gravity</Tab> {/* (spec_gravity_s) */}
        </TabList>

        <TabPanel>
          <p>
            problem_s - remove this
          </p>
          <div>
            <div className=''>
              <div className='userLayout'>
                {localMessages.map((localMessage) => (
                <div className='userCurrentLayout'>
                  <div className='userOther user'>
                    <p>{localMessage.content}</p>
                  </div>
                </div>)
                )}
                <div className='userOtherLayout'>
                  <div className='userCurrent user'>
                    <p>Message from me</p>
                  </div>
                </div>
              </div>
              <div className='inputAreaStyle'>
                <input className='input' type='text' value={text} onChange={(value) => {
                  setText(value.target.value)                  
                }}/>
                <button className='buttonStyle' onClick={() => {
                  const timestamp = Date.now()
                  const content = text;
                  const uuid = firebase.auth().currentUser.uid
                  const type = 'StudentQuery' 
                  // const repliedTo = false
                  const addedToFAQ = false
                  const video = 'problem_s'
                  const image = ''                  
                  const message = {content, timestamp, uuid, type, addedToFAQ, video, image}      
                  const firestore = firebase.firestore();
                  firestore.collection('chats').add(message)
                  .then((docRef) => {
                    console.log("Document written with id: " + docRef.id);
                    setText("")
                  })
                  .catch((error) => {
                    console.error("Error writing document: ", error)
                  });
                }}>Send</button>
              </div>
            </div>
          </div>

        </TabPanel>
        
        <TabPanel>
          <p>
            spec_strat_balan_s
          </p>
        </TabPanel>        

        <TabPanel>
          <p>
            mom_s
          </p>
        </TabPanel>

        <TabPanel>
          <p>
            spec_mom_s
          </p>
        </TabPanel>

        <TabPanel>
          <p>
            gravity_s
          </p>
        </TabPanel>

        <TabPanel>
          <p>
            spec_gravity_s
          </p>
        </TabPanel>                                
      </Tabs>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ChatModal
