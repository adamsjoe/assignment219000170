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
    // setUserId(firebase.auth().currentUser.uid);
    // console.log("user id : ", userId)
    const query = firestore.collection('chats').where("video", "==", 'problem_s').orderBy("timestamp", "desc");      
    query.onSnapshot({
      next: (querySnapshot) => {
        let messages = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, '=>', doc.data());
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
                <div className={`${userId}` === `${localMessage.uuid}` ? 'fromUserLayout userCurrentLayout' : 'fromUserLayout userOtherLayout'} >
                  <div className={`${userId}` === `${localMessage.uuid}` ? 'user userCurrent' : 'user userOther'}>
                    <p>{localMessage.content}</p>
                    { localMessage?.image && localMessage.image.length > 0 && <img style={{width: '100%', height: 'auth', marginBottom: 24 }} src={localMessage.image} alt='chat' /> } 
                  </div>
                </div>)
                )}
              </div>
              <div className='inputAreaStyle'>

                <form className='formInput' onSubmit={async (e) => {
                  e.preventDefault()
                  const timestamp = Date.now()
                  const content = text;
                  const uuid = firebase.auth().currentUser.uid
                  const type = 'StudentQuery' 
                  // const repliedTo = false
                  const addedToFAQ = false
                  const video = 'problem_s'
                  let image = ''      
                  if (localImage) {
                    const uniqueLocalImage = `${localImage.name}_${Math.random().toString(36)}`
                    const uploadTask = storage.ref(`/images/${uniqueLocalImage}`).put(localImage)
                    uploadTask.on('state_changed',
                    () => {},
                    () => {},
                    async () => {
                      const firebaseUrl = await storage.ref('images').child(uniqueLocalImage).getDownloadURL()
                      const message = {content, timestamp, uuid, type, addedToFAQ, video, image: firebaseUrl}   
                      const docRef = await firestore.collection('chats').add(message)
                    })
                  } else {
                    const message = {content, timestamp, uuid, type, addedToFAQ, video, image}
                    const docRef = await firestore.collection('chats').add(message)  
                  }

                  setText('')
                  setLocalImage(null)
                }}>

                <input className='input' type='text' value={text} onChange={(value) => {
                  setText(value.target.value)
                }}/>
                

                <input 
                  key={Date.now()}
                  style={{flex: 1 }}
                  type="file" 
                  onChange={(e) => {
                    const image = e.target.files[0]
                    setLocalImage(image)
                  }}
                />
                  
                <button className='buttonStyle'>Send</button>
                </form>
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
