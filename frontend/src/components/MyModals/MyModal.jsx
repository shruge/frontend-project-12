import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlice';
import { findChannelName, getValidateSchema } from '../utils';
import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

const MyModal = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const channelsName = channels.map(({ name }) => name);
  const { mode, isOpen, channelId } = useSelector((state) => state.modal);
  const channelName = findChannelName(channelId, channels);

  const hideModal = () => {
    dispatch(closeModal());
  };

  const renderModal = () => {
    switch (mode) {
      case 'remove':
        return (
          <RemoveModal
            id={channelId}
            isOpen={isOpen}
            dispatch={dispatch}
            hideModal={hideModal}
          />
        );
      case 'rename':
        return (
          <RenameModal
            id={channelId}
            isOpen={isOpen}
            dispatch={dispatch}
            hideModal={hideModal}
            channelName={channelName}
            schema={getValidateSchema('name', channelsName)}
          />
        );
      case 'add':
        return (
          <AddModal
            isOpen={isOpen}
            dispatch={dispatch}
            id={channels.length}
            hideModal={hideModal}
            channelName={channelName}
            schema={getValidateSchema('name', channelsName)}
          />
        );
      default:
        throw new Error('Unexpected modal type');
    }
  };

  return renderModal();
};

export default MyModal;
