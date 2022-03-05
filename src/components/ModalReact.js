import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/react-bs.css';

function ModalReact({showModal = false, onClose = () =>{}, image}) {
  console.log(">>> ")
  return (
    <Modal
      size="xl"
      show={showModal} 
      onHide={onClose}
      backdrop="static"
      keyboard={false}    
      dialogClassName="videoPopup"    
    >

    <Modal.Body>Woohoo, you're reading this text in a modal! {image}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalReact
