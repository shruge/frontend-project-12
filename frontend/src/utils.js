import { clean } from 'leo-profanity'
import { Bounce } from 'react-toastify'

export const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
}

export const isSwearWord = word => clean(word).split('').every(ch => ch === '*')

export const getChannelName = (id, channels) => {
  const result = channels.find(channel => channel.id === id) || 0

  return !result ? '' : result.name
}

export const getMessagesCount = (channelId, messages) => (
  messages.filter(message => message.channelId === channelId).length
)
