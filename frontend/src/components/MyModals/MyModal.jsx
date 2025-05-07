import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/slices/uiSlice'
import { getChannelName } from '../../utils'
import { getModalsSchema, modals } from './index'

const MyModal = ({ channels }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const channelsName = channels.map(({ name }) => name)
  const { mode, isOpen, channelId } = useSelector(state => state.ui.modal)
  const channelName = getChannelName(channelId, channels)
  const schema = getModalsSchema(channelsName, t)
  const Modal = modals[mode]

  const hideModal = () => {
    dispatch(closeModal())
  }

  return (
    <Modal
      schema={schema}
      isOpen={isOpen}
      hideModal={hideModal}
      channelName={channelName}
    />
  )
}

export default MyModal
