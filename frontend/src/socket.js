import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { channelsApi } from './store/api/channelsApi'
import { messagesApi } from './store/api/messagesApi'

export const socket = io()

const pushItem = item => (draft) => {
  if (draft && Array.isArray(draft)) {
    draft.push(item)
  }
}

export const useChatSocket = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, pushItem(message)))
    })
    socket.on('newChannel', (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, pushItem(channel)))
    })
    socket.on('removeChannel', ({ id }) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          if (draft && Array.isArray(draft)) {
            const filteredChannels = draft.filter(chnl => chnl.id !== id)

            return filteredChannels
          }

          return []
        }),
      )
      dispatch(
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
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          if (draft && Array.isArray(draft)) {
            const renamedChannel = draft.find(chnl => chnl.id === id)

            renamedChannel.name = name
          }
        }),
      )
    })

    return () => {
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('removedChannel')
    }
  }, [dispatch])
}
