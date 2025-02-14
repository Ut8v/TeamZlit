
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
function PopupModal({ isShown, title, body, onClose }) {
    return (
      <Modal
        show={isShown}
        onHide={onClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    );
  }

export default PopupModal;