import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { ArrowRightSquare, PlusSquare } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Row from 'react-bootstrap/esm/Row';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import { setChannel } from '../store/slices/channelsSlice';
import { addMessage } from '../store/slices/messagesSlice';

const Chat = () => {
  const inpRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesApi);
  const { token, username } = useSelector((state) => state.authData);
  const { data: channels, currChannel } = useSelector((state) => state.channelsApi);
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      axios.post('http://localhost:5001/api/v1/messages', {
        body, username, channelId: currChannel,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      }).finally(() => {
        resetForm();
      });
    },
  });
  const isDisabled = !values.body.length;

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  useEffect(() => {
    inpRef.current?.focus();
  }, [currChannel, dispatch]);

  const findChannel = (id, items) => {
    const channel = items.find((chnl) => chnl.id === id);

    return channel ? channel.name : null;
  };

  const changeChannel = (id) => () => {
    dispatch(setChannel(id));
  };

  const renderChannels = () => (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(({ id, name }) => (
        <li className="nav-item w-100" key={id}>
          <Button
            type="button"
            onClick={changeChannel(id)}
            className="w-100 rounded-0 text-start"
            variant={id === currChannel ? 'secondary' : ''}
          >
            <span className="me-1">#</span>
            {name}
          </Button>
        </li>
      ))}
    </ul>
  );

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map(({
        id, username: name, body, channelId,
      }) => (
        channelId !== currChannel ? null
          : (
            <div key={id} className="text-break mb-2">
              <b>{name}</b>
              :
              {' '}
              {body}
            </div>
          )
      ))}
    </div>
  );

  return (
    <Container fluid className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button type="button" className="p-0 text-primary btn-group-vertical" variant="">
              <PlusSquare size="20" />
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          {renderChannels()}
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {findChannel(currChannel, channels)}
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
                  <Button
                    variant=""
                    type="submit"
                    disabled={isDisabled}
                    className="btn-group-vertical"
                  >
                    <ArrowRightSquare size={20} />
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
