import * as yup from 'yup';
import AddModal from './components/MyModals/AddModal';
import RemoveModal from './components/MyModals/RemoveModal';
import RenameModal from './components/MyModals/RenameModal';

export const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

export const getModalsSchema = (key, items) => {
  const schema = yup.object().shape({
    [key]: yup.string().required('Обязательное поле')
      .trim()
      .notOneOf(items, 'Должно быть уникальным')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
  });

  return schema;
};

export const getRegistrSchema = () => {
  const schema = yup.object().shape({
    username: yup.string().required('Обязательное поле')
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string().required('Обязательное поле')
      .trim().min(6, 'Не менее 6 символов'),
    confirmPassword: yup.string().required('Обязательное поле')
      .trim()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
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
