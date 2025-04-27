import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlice';
import { getChannelName, getValidateSchema, modals } from '../utils';

const MyModal = ({ channels }) => {
  const dispatch = useDispatch();
  const channelsName = channels.map(({ name }) => name);
  const { mode, isOpen, channelId } = useSelector((state) => state.modal);
  const channelName = getChannelName(channelId, channels);
  const schema = getValidateSchema('name', channelsName);
  const Modal = modals[mode];

  const hideModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      id={channelId}
      schema={schema}
      isOpen={isOpen}
      hideModal={hideModal}
      channelName={channelName}
    />
  );
};

export default MyModal;
