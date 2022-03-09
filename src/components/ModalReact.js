import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/react-bs.css';

function ModalReact({showModal = false, onClose = () =>{}, image, size}) {
  console.log("im ", image)
  return (
    <Modal
      size={size}
      show={showModal} 
      onHide={onClose}
      backdrop="static"
      keyboard={false}    
      // dialogClassName="videoPopup"    
    >

    <Modal.Body><img className='modalImg' src={image} alt="lala"></img></Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalReact
