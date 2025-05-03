import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useRemoveChannelMutation } from '../../store/api/channelsApi'
import { useRemoveMessageMutation } from '../../store/api/messagesApi'

const RemoveModal = ({
  t, toast, toastOpt, id, isOpen, hideModal,
}) => {
  const [removeMessage] = useRemoveMessageMutation()
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const delChannel = async () => {
    await removeMessage(id)
    await removeChannel(id).unwrap()
    hideModal()

    toast.success(t('toasts.remove'), toastOpt)
  }

  return (
    <Modal show={isOpen} onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.warning')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>{t('buttons.cancel')}</Button>
          <Button type="submit" variant="danger" onClick={delChannel} disabled={isLoading}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveModal
