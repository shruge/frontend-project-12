import * as yup from 'yup';
import AddModal from './components/MyModals/AddModal';
import RemoveModal from './components/MyModals/RemoveModal';
import RenameModal from './components/MyModals/RenameModal';

export const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

export const getModalsSchema = (key, items, t) => {
  const schema = yup.object().shape({
    [key]: yup.string().required(t('validation.required'))
      .trim()
      .notOneOf(items, t('validation.unique'))
      .min(3, t('validation.maxMinLen'))
      .max(20, t('validation.maxMinLen')),
  });

  return schema;
};

export const getRegistrSchema = (t) => {
  const schema = yup.object().shape({
    username: yup.string().required(t('validation.required'))
      .trim()
      .min(3, t('validation.maxMinLen'))
      .max(20, t('validation.maxMinLen')),
    password: yup.string().required(t('validation.required'))
      .trim().min(6, t('validation.passwordMinLen')),
    confirmPassword: yup.string().required(t('validation.required'))
      .trim()
      .oneOf([yup.ref('password'), null], t('validation.passwordConfirm')),
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
