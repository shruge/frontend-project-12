import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authData;

      if (token) { headers.set('authorization', `Bearer ${token}`); }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => '',
      // providesTags: (res) => res
      //   ? [
      //       ...res.map(({ id }) => ({ type: 'Messages', id })),
      //       { type: 'Messages', id: 'LIST' },
      //     ]
      //   : [{ type: 'Messages', id: 'LIST' }],
    }),
    addMessage: build.mutation({
      query: (body) => ({
        method: 'POST',
        body,
      }),
      // invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    removeMessage: build.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `${id}`,
      }),
      // invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation, useRemoveMessageMutation } = messagesApi;
