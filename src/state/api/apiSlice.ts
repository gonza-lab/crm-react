import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import OrderDB from '../../interfaces/OrderDB';
import { PaginatedRequest } from '../../interfaces/PaginatedRequest';
import { PaginatedResponse } from '../../interfaces/PaginatedResponse';
import { getToken } from '../../service/Token';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || '',
    prepareHeaders: (headers, _) => {
      headers.set('Authorization', `Bearer ${getToken()}`);

      return headers;
    },
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({}),
});
