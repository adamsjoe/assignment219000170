/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function Chat() {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  const adminList = ['zb9IdFt56ygg45XaWcqphOOQ2WP2'];

  const firestore = firebase.firestore();
  const storage = firebase.storage();

  useEffect(() => {
    setUserId(firebase.auth()?.currentUser?.uid);
    const query = firestore.collection('chats').orderBy('timestamp', 'asc');
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
  }, []);

  return (
    <div>
      <div>
        <div>
          {localMessages.map((localMessage) => (
            // lint fail here - interesting
            // eslint-disable-next-line react/jsx-key
            <div style={{
              display: 'flex',
              flex: 1,
              justifyContent:
              userId === localMessage.uid ? 'flex-end' : 'flex-start'}}>
              <div style={{
                minHeight: 52,
                width: 600,
                backgroundColor: userId === localMessage.uid ? 'blue' : (localMessage.like === true ? 'yellow' : 'red'),
                color: 'white',
                paddingLeft: 24,
                fontWeight: 'bold',
                marginTop: 24,
                marginLeft: 24,
                marginRight: 24,
                borderRadius: 12}}>
                <p>{localMessage.content}</p>
                {localMessage?.image && localMessage.image.length > 0 &&
                <img style={{width: '100%', height: 'auto', marginBottom: 24}}
                  src={localMessage.image} />}
                {(userId !== localMessages.uid) && (adminList.includes(userId)) && (localMessage.like === false) &&
                <button style={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontSize: 22,
                  marginBottom: 24,
                  borderWidth: 0,
                  fontWeight: 'bold',
                  borderRadius: 8,
                  paddingTop: 4,
                  paddingBottom: 4,
                  paddingLeft: 8,
                  paddingRight: 8,
                }} onClick={async () => {
                  // need the doc uid
                  await firestore.collection('chats').doc(localMessage.mid).update({
                    like: true,
                  });
                }}>Like</button>}              </div>
            </div>),
          )}
        </div>
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 24}}>
          <form style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1}}
          onSubmit={async (e) => {
            e.preventDefault();
            const timestamp = Date.now();
            const image = '';
            const content = text;
            const uid = userId;
            if (localImage) {
              const uniqueLocalImage =
                `${localImage.name}_${Math.random().toString(36)}`;
              const uploadTask =
              storage.ref(`/images/${uniqueLocalImage}`).put(localImage);
              console.log('xxxx');
              uploadTask.on('state_changed',
                  () => {},
                  () => {},
                  async () => {
                    // eslint-disable-next-line max-len
                    const fireBaseUrl = await storage.ref('images').child(uniqueLocalImage).getDownloadURL();
                    console.log('>>>>> firebase url', fireBaseUrl);
                    alert(fireBaseUrl);
                    console.log('>>>>> image url', uniqueLocalImage);
                    // eslint-disable-next-line max-len
                    const message = {content, timestamp, uid, image: fireBaseUrl};
                    // eslint-disable-next-line no-unused-vars
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line no-unused-vars
                    const docRef = await firestore.collection('chats').add(message);
                  });
            } else {
              const message = {content, timestamp, uid, image};
              // eslint-disable-next-line no-unused-vars
              const docRef = await firestore.collection('chats').add(message);
            }
            setText('');
            setLocalImage(null);
          }
          }>
            <input style={{
              flex: 11,
              height: 32,
              fontSize: 28,
            }} type='text' value={text} onChange={(value) => {
              setText(value.target.value);
            }}/>
            <input
              key={Date.now()}
              style={{
                flex: 1,
                backgroundColor: 'blue',
                colour: 'white',
                fontWeight: 'bold',
                fontSize: 18}}
              type='file'
              onChange={(e) => {
                const image = e.target.files[0];
                setLocalImage(image);
              }}
            />
            <button type='submit'
              style={{
                flex: 1,
                backgroundColor: 'blue',
                colour: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                borderWidth: 0,
              }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
