import * as yup from 'yup';
import AddModal from './MyModals/AddModal';
import RemoveModal from './MyModals/RemoveModal';
import RenameModal from './MyModals/RenameModal';

export const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

export const getValidateSchema = (key, items) => {
  const schema = yup.object().shape({
    [key]: yup.string().required('Обязательное поле')
      .trim()
      .notOneOf(items, 'Должно быть уникальным')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
  });

  return schema;
};

export const getChannelName = (id, channels) => {
  const result = channels.find((channel) => channel.id === id) || 0;

  return !result ? '' : result.name;
};

export const getMessagesCount = (channelId, messages) => (
  messages.filter((message) => message.channelId === channelId).length
);
