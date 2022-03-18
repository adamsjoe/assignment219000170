import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function VideoModal({showModal = false, onClose = () =>{}, videoMessage, size, authorised, txt}) {

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
        {authorised ? (
          confused ? (
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
          {/* <Button className="confusedBtn" onClick={()=>{auth ? setConfused(true) : setConfused(false)}}> */}
            Confused?
          </Button>
        </div>
      )) : (
        <br />
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
