import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ImageModal({showIModal = false, onClose = () =>{}, image, size}) {

  if (showIModal) {
    console.log("image: ", image)
  }
  
  return (
    <Modal
      size={size}
      show={showIModal} 
      onHide={onClose}
      backdrop="static"
      keyboard={false}    
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
