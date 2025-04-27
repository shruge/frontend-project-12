import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  tagTypes: ['Channels'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authData;

      if (token) { headers.set('authorization', `Bearer ${token}`); }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => 'api/v1/channels',
      // providesTags: (res) => res
      //   ? [
      //       ...res.map(({ id }) => ({ type: 'Channels', id })),
      //       { type: 'Channels', id: 'LIST' },
      //     ]
      //   : [{ type: 'Channels', id: 'LIST' }],
    }),
    addChannel: build.mutation({
      query: (body) => ({
        url: 'api/v1/channels',
        method: 'POST',
        body,
      }),
      // invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    renameChannel: build.mutation({
      query: ({ body, id }) => ({
        body,
        method: 'PATCH',
        url: `api/v1/channels/${id}`,
      }),
      // invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
    removeChannel: build.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `api/v1/channels/${id}`,
      }),
      // invalidatesTags: [{ type: 'Channels', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation,
} = channelsApi;
