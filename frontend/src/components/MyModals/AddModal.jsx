import { useFormik } from 'formik'
import { clean } from 'leo-profanity'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAddChannelMutation } from '../../store/api/channelsApi'
import { toastOptions } from '../../utils'

const AddModal = ({ schema, isOpen, hideModal }) => {
  const { t } = useTranslation()
  const [addChannel, { isLoading }] = useAddChannelMutation()
  const {
    touched, values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      await addChannel({ name: clean(name) }).unwrap()
      resetForm()
      hideModal()

      toast.success(t('toasts.add'), toastOptions)
    },
  })

  return (
    <Modal show={isOpen} centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Control
              id="name"
              autoFocus
              name="name"
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

export default AddModal
