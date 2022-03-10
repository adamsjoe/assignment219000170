import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/react-bs.css';

function VideoModal({showModal = false, onClose = () =>{}, videoMessage, content, size}) {
  return (
    <Modal
      size={size}
      show={showModal} 
      onHide={onClose}
      backdrop="static"
      keyboard={false}    
      // dialogClassName="videoPopup"    
    >

    <Modal.Body>
      <video src={videoMessage} autoPlay></video> 
      <br/>
      {/* {content} */}
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
