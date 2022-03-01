import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalReact(props) {
  const {showModal = false, onClose = ()=>{}} = props;
  const [show, setShow] = useState(showModal);

  React.useEffect(()=>{
    setShow(showModal);
  },[showModal]);

  const handleClose = () => {
   setShow(false);
   // just to have custom function for modal close which will be used can be used in HintComponent maybe you want to perform somehting else after modal close.
   typeof onClose === 'function' && onClose();
  };
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}        
      >

        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReact
