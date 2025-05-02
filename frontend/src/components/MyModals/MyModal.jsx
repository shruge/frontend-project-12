import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { closeModal } from '../../store/slices/modalSlice';
import {
  getChannelName, getModalsSchema,
  modals,
  toastOptions,
} from '../../utils';

const MyModal = ({ t, channels }) => {
  const dispatch = useDispatch();
  const channelsName = channels.map(({ name }) => name);
  const { mode, isOpen, channelId } = useSelector((state) => state.modal);
  const channelName = getChannelName(channelId, channels);
  const schema = getModalsSchema('name', channelsName, t);
  const Modal = modals[mode];

  const hideModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      t={t}
      toast={toast}
      id={channelId}
      schema={schema}
      isOpen={isOpen}
      hideModal={hideModal}
      toastOpt={toastOptions}
      channelName={channelName}
    />
  );
};

export default MyModal;
