import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/react-bs.css';

function ModalReact({showModal = false, onClose = () =>{}}) {
  return (
    <Modal
    size="xl"
    show={showModal} 
    onHide={onClose}
    backdrop="static"
    keyboard={false}    
    dialogClassName="videoPopup"    
  >

    {/* <Modal.Header closeButton>
      {/* <Modal.Title>Modal heading</Modal.Title> */}
    {/* </Modal.Header> */}
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalReact
