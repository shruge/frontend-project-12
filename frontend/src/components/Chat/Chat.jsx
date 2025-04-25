import { useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage } from '../../store/slices/messagesSlice';
import MyModal from '../MyModals/MyModal';
import Channels from './Channels';
import MessageForm from './MessageForm';

const Chat = () => {
  const socket = io();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const { currChannel } = useSelector((state) => state.global);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket, dispatch]);

  return (
    <Container fluid className="container h-100 my-4 overflow-hidden rounded shadow">
      <MyModal />
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels dispatch={dispatch} channels={channels} currChannel={currChannel} />
        </Col>
        <Col className="p-0 h-100">
          <MessageForm dispatch={dispatch} channels={channels} currChannel={currChannel} />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
