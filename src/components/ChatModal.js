/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/chatroom.css';

function ChatModal({showCModal = false, onClose = () =>{}, size, admin}) {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');

  const [activeTab, setActiveTab] = useState('');

  const [localMessages, setLocalMessages] = useState([]);
  const [localImage, setLocalImage] = useState(null);

  const firestore = firebase.firestore();
  const storage = firebase.storage();

  const chatNames = [
    'problem_s',
    'spec_strat_balan_s',
    'mom_s',
    'spec_mom_s',
    'gravity_s',
    'spec_gravity_s',
    'info',
  ];

  

  useEffect(() => {        
    console.log('active tab is ' + activeTab)    
    setUserId(firebase.auth()?.currentUser?.uid);
    const query = firestore.collection('chats').where('video', '==', activeTab).orderBy('timestamp', 'desc');
    query.onSnapshot({
      next: (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({mid: doc.id, ...doc.data()});
        });
        setLocalMessages(messages);
      },
    });
  }, [activeTab, firestore]);

  function getFirstNameFromGoogle() {
    const user = firebase.auth().currentUser;
    const names = user.displayName.split(' ');
    return names;
  }

  function showChat() {
    return (
      <div>
        <div className=''>
          <div className='userLayout'>
            {localMessages.map((localMessage) => (              
              <div className={`${userId}` === `${localMessage.uuid}` ? 'fromUserLayout userCurrentLayout' : 'fromUserLayout userOtherLayout'} >                
                <div className={`${userId}` === `${localMessage.uuid}` ? 'user userCurrent' : 'user userOther'}>
                  <p className='chatUser'>{`${userId}` === `${localMessage.uuid}` ? 'You' : localMessage.userName[0] } {localMessage.isAdmin === true ? '- ( Chat Admin )': ''}</p>
                  <p>{localMessage.content}</p>
                  { localMessage?.image && localMessage.image.length > 0 && <img style={{width: '100%', height: 'auto', marginBottom: 24}} src={localMessage.image} alt='chat' /> }
                  <p className='chatTimestamp'><b>Sent:</b> {new Date(localMessage.timestamp).toLocaleTimeString()}, {new Date(localMessage.timestamp).toDateString() }</p>
                  {(admin === true && localMessage.addedToFAQ === false) ? <button className='addFAQButton' onClick={async () => {
                    await firestore.collection('chats').doc(localMessage.mid).update({
                      addedToFAQ: true,
                    });
                  }}>Add to FAQ</button> : ''}
                </div>
              </div>),
            )}
          </div>

          <div className='inputAreaStyle'>
            <form className='formInput' onSubmit={async (e) => {
              e.preventDefault();
              const timestamp = Date.now();
              const content = text;
              const uuid = firebase.auth().currentUser.uid;
              const type = 'StudentQuery';
              // const repliedTo = false
              const isAdmin = admin;
              const addedToFAQ = false;
              const video = 'problem_s';
              const userName = getFirstNameFromGoogle();
              const image = '';
              if (localImage) {
                const uniqueLocalImage = `${localImage.name}_${Math.random().toString(36)}`;
                const uploadTask = storage.ref(`/images/${uniqueLocalImage}`).put(localImage);
                uploadTask.on('state_changed',
                    () => {},
                    () => {},
                    async () => {
                      const firebaseUrl = await storage.ref('images').child(uniqueLocalImage).getDownloadURL();
                      const message = {content, timestamp, uuid, type, addedToFAQ, video, userName, isAdmin, image: firebaseUrl};
                      const docRef = await firestore.collection('chats').add(message);
                    });
              } else {
                const message = {content, timestamp, uuid, type, addedToFAQ, video, userName, isAdmin, image};
                const docRef = await firestore.collection('chats').add(message);
              }

              setText('');
              setLocalImage(null);
            }}>

              <input className='input' type='text' value={text} onChange={(value) => {
                setText(value.target.value);
              }}/>

              <label htmlFor='file-upload' className='custom-file-upload'>
                <i className="fa fa-cloud-upload"></i>Upload File
              </label>
              <input
                id='file-upload'
                key={Date.now()}
                style={{flex: 1}}
                type="file"
                onChange={(e) => {
                  const image = e.target.files[0];
                  setLocalImage(image);
                }}
              />

              <button className='buttonStyle'>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      size={size}
      show={showCModal}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >

      <Modal.Body>
        <Tabs defaultIndex={6} onSelect={(index) => setActiveTab(chatNames[index])}>
          <TabList>
            <Tab>Gen Problem Solving</Tab> {/* (problem_s) */}
            <Tab>Spec Balances Problem</Tab> {/* (spec_strat_balan_s) */}
            <Tab>Gen Moments</Tab> {/* (mom_s) */}
            <Tab>Spec Moments</Tab> {/* (spec_mom_s) */}
            <Tab>Gen Gravity</Tab> {/* (gravity_s) */}
            <Tab>Spec Gravity</Tab> {/* (spec_gravity_s) */}
            <Tab>Info</Tab>
          </TabList>

          <TabPanel>
            {showChat()}
          </TabPanel>

          <TabPanel>
            {showChat()}
          </TabPanel>

          <TabPanel>
            {showChat()}
          </TabPanel>

          <TabPanel>
            {showChat()}
          </TabPanel>

          <TabPanel>
            {showChat()}
          </TabPanel>

          <TabPanel>
            {showChat()}
          </TabPanel>

          <TabPanel>
            Please select the tab of the video you are interested in.
          </TabPanel>
        </Tabs>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
        Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChatModal;
