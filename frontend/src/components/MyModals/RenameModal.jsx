import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { renameChannel } from '../../store/slices/channelsSlice';

const RenameModal = ({
  id, schema, isOpen, dispatch, hideModal, channelName,
}) => {
  const inputRef = useRef(null);
  const {
    touched, isValid, values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: ({ name }, { resetForm }) => {
      dispatch(renameChannel({ id, name }));
      resetForm();
      hideModal();
    },
  });

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  return (
    <Modal show={isOpen} centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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

export default RenameModal;
