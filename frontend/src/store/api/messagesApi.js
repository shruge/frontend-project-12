import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authData;

      if (token) { headers.set('authorization', `Bearer ${token}`); }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => 'api/v1/messages',
      // providesTags: (res) => res
      //   ? [
      //       ...res.map(({ id }) => ({ type: 'Messages', id })),
      //       { type: 'Messages', id: 'LIST' },
      //     ]
      //   : [{ type: 'Messages', id: 'LIST' }],
    }),
    addMessage: build.mutation({
      query: (body) => ({
        url: 'api/v1/messages',
        method: 'POST',
        body,
      }),
      // invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
    removeMessage: build.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `api/v1/messages/${id}`,
      }),
      // invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation, useRemoveMessageMutation } = messagesApi;
