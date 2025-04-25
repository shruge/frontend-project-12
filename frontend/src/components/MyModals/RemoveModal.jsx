import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { removeChannel } from '../../store/slices/channelsSlice';

const RemoveModal = ({
  id, isOpen, dispatch, hideModal,
}) => {
  const delChannel = () => {
    dispatch(removeChannel({ id }));
    hideModal();
  };

  return (
    <Modal show={isOpen} onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
          <Button type="submit" variant="danger" onClick={delChannel}> Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
