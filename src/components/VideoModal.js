import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/react-bs.css';
import { useState } from 'react';

function VideoModal({showModal = false, onClose = () =>{}, videoMessage, content, size}) {

  const [confused, setConfused] = useState(false)

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
        <div>
          What have you found confusing about this video?
          <textarea className='confusedText' rows="2"></textarea>          
          <Button className="confusedBtnSave">
            Save
          </Button>
          <Button className="confusedBtnCancel" onClick={()=>setConfused(false)}>
            Cancel
          </Button>          
        </div>
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
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default VideoModal
