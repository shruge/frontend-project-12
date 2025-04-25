import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addChannel } from '../../store/slices/channelsSlice';

const AddModal = ({
  id, schema, channelName, isOpen, dispatch, hideModal,
}) => {
  const {
    touched, isValid, values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: ({ name }, { resetForm }) => {
      dispatch(addChannel({ id: String(id + 1), name, removable: true }));
      resetForm();
      hideModal();
    },
  });

  return (
    <Modal show={isOpen} centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
              onChange={handleChange}
              isInvalid={touched.name && !isValid}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{channelName}</Form.Label>
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
              <Button type="submit">Отправить</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
