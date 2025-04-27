import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRemoveChannelMutation } from '../../store/api/channelsApi';
import { useRemoveMessageMutation } from '../../store/api/messagesApi';

const RemoveModal = ({ id, isOpen, hideModal }) => {
  const [removeMessage] = useRemoveMessageMutation();
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const delChannel = async () => {
    await removeMessage(id);
    await removeChannel(id).unwrap();
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
          <Button type="submit" variant="danger" onClick={delChannel} disabled={isLoading}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
