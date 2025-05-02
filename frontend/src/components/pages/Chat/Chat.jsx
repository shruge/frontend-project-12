import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useChatSocket } from '../../../socket';
import { useGetChannelsQuery } from '../../../store/api/channelsApi';
import MyModal from '../../MyModals/MyModal';
import Channels from './Channels';
import MessageForm from './MessageForm';

const Chat = () => {
  useChatSocket();
  const { t } = useTranslation();
  const { data = [] } = useGetChannelsQuery();
  const { currChannel } = useSelector((state) => state.global);

  return (
    <Container fluid className="container h-100 my-4 overflow-hidden rounded shadow">
      <MyModal t={t} channels={data} />
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels t={t} channels={data} currChannelId={currChannel} />
        </Col>
        <Col autoFocus className="p-0 h-100">
          <MessageForm t={t} channels={data} currChannelId={currChannel} />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
