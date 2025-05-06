import { io } from 'socket.io-client'
import { channelsApi } from './store/api/channelsApi'
import { messagesApi } from './store/api/messagesApi'

export const socket = io()

const pushItem = item => (draft) => {
  if (draft && Array.isArray(draft)) {
    draft.push(item)
  }
}

export const initChatSocket = (store) => {
  socket.off('newMessage')
  socket.off('newChannel')
  socket.off('renameChannel')
  socket.off('removeChannel')

  socket.on('newMessage', (message) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, pushItem(message)))
  })
  socket.on('newChannel', (channel) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, pushItem(channel)))
  })
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        if (draft && Array.isArray(draft)) {
          const filteredChannels = draft.filter(chnl => chnl.id !== id)

          return filteredChannels
        }

        return []
      }),
    )
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        if (draft && Array.isArray(draft)) {
          const filteredMessages = draft.filter(msg => msg.channelId !== id)

          return filteredMessages
        }

        return []
      }),
    )
  })
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        if (draft && Array.isArray(draft)) {
          const renamedChannel = draft.find(chnl => chnl.id === id)

          renamedChannel.name = name
        }
      }),
    )
  })
}
