import { clean } from 'leo-profanity';
import { Bounce } from 'react-toastify';
import * as yup from 'yup';
import AddModal from './components/MyModals/AddModal';
import RemoveModal from './components/MyModals/RemoveModal';
import RenameModal from './components/MyModals/RenameModal';

export const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

const isSwearWord = (word) => clean(word).split('').every((ch) => ch === '*');

export const rollbarConfig = {
  accessToken: '48e114e16b6e4fcf9c3e2268daf4ee70',
  captureUnhandledRejections: true,
  environment: 'testenv',
  captureUncaught: true,
};

export const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};

export const getModalsSchema = (key, items, t) => {
  const schema = yup.object().shape({
    [key]: yup.string().required(t('validation.required'))
      .trim()
      .notOneOf(items, t('validation.unique'))
      .min(3, t('validation.maxMinLen'))
      .max(20, t('validation.maxMinLen'))
      .test('', '', (val) => {
        if (isSwearWord(val)) {
          const allSwearWords = items.filter((word) => isSwearWord(word));

          return allSwearWords.every((item) => val.length !== item.length);
        }

        return true;
      }),
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
