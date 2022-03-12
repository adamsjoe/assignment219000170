import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CheckAnswerModal({showModal = false, onClose = () =>{}, videoMessage, content, size}) {

  return (
    <Modal
      size={size}
      show={showModal} 
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >

    <Modal.Body>
      {videoMessage ? <video src={videoMessage} controls autoPlay> </video>: <div>{content}</div>}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CheckAnswerModal
