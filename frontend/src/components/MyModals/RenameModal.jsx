import { useFormik } from 'formik'
import { clean } from 'leo-profanity'
import { useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRenameChannelMutation } from '../../store/api/channelsApi'
import { toastOptions } from '../../utils'

const RenameModal = ({
  schema, isOpen, hideModal, channelName,
}) => {
  const id = useSelector(state => state.modal.channelId)
  const inputRef = useRef(null)
  const { t } = useTranslation()
  const [renameChannel, { isLoading }] = useRenameChannelMutation()
  const {
    touched, values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      await renameChannel({ body: { name: clean(name) }, id }).unwrap()
      resetForm()
      hideModal()

      toast.success(t('toasts.rename'), toastOptions)
    },
  })

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }, [])

  return (
    <Modal show={isOpen} centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Control
              id="name"
              name="name"
              ref={inputRef}
              className="mb-2"
              value={values.name}
              disabled={isLoading}
              onChange={handleChange}
              isInvalid={touched.name && errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>{t('buttons.cancel')}</Button>
              <Button type="submit" disabled={isLoading}>{t('buttons.send')}</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameModal
