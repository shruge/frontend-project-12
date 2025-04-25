import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { useSelector } from 'react-redux';
import { sendMessage } from '../../store/slices/messagesSlice';
import { findChannelName } from '../utils';

const MessageForm = ({ channels, currChannel, dispatch }) => {
  const inpRef = useRef(null);
  const { allMessages } = useSelector((state) => state.messages);
  const { token, username } = useSelector((state) => state.authData);
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      dispatch(sendMessage({
        msgData: { body, username, channelId: currChannel }, token,
      })).unwrap().finally(() => {
        resetForm();
      });
    },
  });
  const isDisabled = !values.body.trim().length;

  useEffect(() => {
    inpRef.current?.focus();
  }, [currChannel]);

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {allMessages.map((msg) => (
        msg.channelId !== currChannel ? null
          : (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username}</b>
              :
              {' '}
              {msg.body}
            </div>
          )
      ))}
    </div>
  );

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {findChannelName(currChannel, channels)}
          </b>
        </p>
        <span className="text-muted">0 сообщений</span>
      </div>
      {renderMessages()}
      <div className="mt-auto px-5 py-3">
        <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup hasValidation={isDisabled}>
            <Form.Control
              name="body"
              ref={inpRef}
              value={values.body}
              onChange={handleChange}
              aria-label="Новое сообщение"
              className="border-0 p-0 ps-2"
              placeholder="Введите сообщение..."
            />
            <Button className="btn-group-vertical" type="submit" disabled={isDisabled} variant="">
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">Отправить</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default MessageForm;
