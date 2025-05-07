import { useFormik } from 'formik'
import { clean } from 'leo-profanity'
import { useEffect, useRef } from 'react'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useAddMessageMutation, useGetMessagesQuery } from '../../store/api/messagesApi'
import { getChannelName, getMessagesCount } from '../../utils'

const MessageForm = ({ channels }) => {
  const inpRef = useRef(null)
  const { t } = useTranslation()
  const { data = [] } = useGetMessagesQuery()
  const { username } = useSelector(state => state.authData)
  const { currChannel } = useSelector(state => state.ui)
  const [addMessage] = useAddMessageMutation()
  const messagesCount = getMessagesCount(currChannel, data)
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }, { resetForm }) => {
      resetForm()
      await addMessage({ body: clean(body), username, channelId: currChannel }).unwrap()
    },
  })
  const isDisabled = !values.body.trim().length

  useEffect(() => {
    inpRef.current?.focus()
  }, [currChannel])

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {data.map(msg => (
        msg.channelId !== currChannel
          ? null
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
  )

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {getChannelName(currChannel, channels)}
          </b>
        </p>
        <span className="text-muted">
          {t('chat.messagesCount', { count: messagesCount })}
        </span>
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
              aria-label={t('ariaLabels.newMessage')}
              className="border-0 p-0 ps-2"
              placeholder={t('placeholders.enterMessage')}
            />
            <Button className="btn-group-vertical" type="submit" disabled={isDisabled} variant="">
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">{t('buttons.send')}</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default MessageForm
