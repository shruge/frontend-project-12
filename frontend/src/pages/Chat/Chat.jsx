import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import { useTranslation } from 'react-i18next'
import MyModal from '../../components/MyModals/MyModal'
import { useGetChannelsQuery } from '../../store/api/channelsApi'
import Channels from './Channels'
import MessageForm from './MessageForm'

const Chat = () => {
  const { t } = useTranslation()
  const { data = [], isLoading } = useGetChannelsQuery()

  return isLoading
    ? <h1 className="text-center my-auto">{t('chatLoading')}</h1>
    : (
        <Container fluid className="container h-100 my-4 overflow-hidden rounded shadow">
          <MyModal channels={data} />
          <Row className="h-100 bg-white flex-md-row">
            <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
              <Channels channels={data} />
            </Col>
            <Col autoFocus className="p-0 h-100">
              <MessageForm channels={data} />
            </Col>
          </Row>
        </Container>
      )
}

export default Chat
