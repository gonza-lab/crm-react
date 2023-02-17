import { CreateOrderRequest } from '../../interfaces/CreateOrderRequest';
import OrderDB from '../../interfaces/OrderDB';
import { PaginatedRequest } from '../../interfaces/PaginatedRequest';
import { PaginatedResponse } from '../../interfaces/PaginatedResponse';
import { UpdateOrderRequest } from '../../interfaces/UpdateOrderRequest';
import { apiSlice } from '../api/apiSlice';

type order = 'Order';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderDB[], PaginatedRequest>({
      query: (options) => {
        return {
          url: '/order',
          method: 'GET',
          params: options,
        };
      },
      providesTags: (result = []) => [
        'Order',
        ...result.map(({ id }) => ({ type: 'Order' as order, id })),
      ],
      transformResponse: (res: PaginatedResponse<OrderDB[]>) => {
        return res.data;
      },
    }),
    getOrderById: builder.query<OrderDB, number>({
      query: (id) => '/order/' + id,
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
    }),
    createOrder: builder.mutation<OrderDB, CreateOrderRequest>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrder: builder.mutation<
      OrderDB,
      { id: number; data: UpdateOrderRequest }
    >({
      query: ({ id, data }) => ({
        url: '/order/' + id,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = extendedApiSlice;
