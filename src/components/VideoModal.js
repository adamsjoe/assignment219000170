import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function VideoModal({showModal = false, onClose = () =>{}, videoMessage, size, txt}) {
  
  const firestore = firebase.firestore();

  const [confused, setConfused] = useState(false)
  const [text, setText] = useState("");
  const [video, setVideo] = useState("")

  console.log("Video Modal ", txt)
  
  return (
    <Modal
      size={size}
      show={showModal} 
      onHide={onClose}
      onClose={()=>setConfused(false)}
      backdrop="static"
      keyboard={false}
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
          const confusedVideo = video // no wrong
          const uuid = 'blah'

          const message = {content, timestamp, uuid}              
          const docRef = await firestore.collection('problem_s').add(message);
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
              Savez
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
