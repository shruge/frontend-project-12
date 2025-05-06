import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import routes from '../../api/routes'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  tagTypes: ['Channels'],
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channelsLink(),
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authData

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({
    getChannels: build.query({
      query: () => '',
      // providesTags: (res) => res
      //   ? [
      //       ...res.map(({ id }) => ({ type: 'Channels', id })),
      //       { type: 'Channels', id: 'LIST' },
      //     ]
      //   : [{ type: 'Channels', id: 'LIST' }],
    }),
    addChannel: build.mutation({
      query: body => ({
        method: 'POST',
        body,
      }),
      // invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    renameChannel: build.mutation({
      query: ({ body, id }) => ({
        body,
        method: 'PATCH',
        url: `${id}`,
      }),
      // invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    removeChannel: build.mutation({
      query: id => ({
        method: 'DELETE',
        url: `${id}`,
      }),
      // invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetChannelsQuery, useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation,
} = channelsApi
