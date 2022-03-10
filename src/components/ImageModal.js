import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/react-bs.css';

function ImageModal({showModal = false, onClose = () =>{}, image, size}) {
  
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

export default ImageModal
