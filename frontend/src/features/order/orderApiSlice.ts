import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

interface OrderCreateResponse {
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  orderItems: {
    _id: string;
    product: string;
    name: string;
    image: string;
    price: string;
    qty: number;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderCreateRequestBody {
  orderItems: {
    product: string;
    name: string;
    image: string;
    price: number;
    qty: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

interface MyOrder {
  shippingAddress: ShippingAddress;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  orderItems: {
    _id: string;
    product: string;
    name: string;
    image: string;
    price: string;
    qty: number;
  }[];
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paidAt?: string;
  deliveredAt?: string;
}

export interface OrderDetails {
  shippingAddress: ShippingAddress;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: { _id: string; name: string; email: string };
  orderItems: {
    _id: string;
    product: string;
    name: string;
    image: string;
    price: string;
    qty: number;
  }[];
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paidAt?: string;
  deliveredAt?: string;
}

export const orderApiSlice = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/orders',
    prepareHeaders(headers, api) {
      const token = (api.getState() as RootState).auth.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      createOrder: builder.mutation<
        OrderCreateResponse,
        OrderCreateRequestBody
      >({
        query(args) {
          return {
            url: '/',
            method: 'POST',
            body: { ...args },
          };
        },
      }),

      myOrders: builder.query<MyOrder[], boolean | void>({
        query() {
          return {
            url: '/myorders',
            method: 'GET',
          };
        },
      }),

      orderDetails: builder.query<OrderDetails, string>({
        query(orderId) {
          return {
            url: `/${orderId}`,
            method: 'GET',
          };
        },
      }),

      orderList: builder.query<OrderDetails[], boolean | void>({
        query() {
          return {
            url: '/',
            method: 'GET',
          };
        },
      }),

      payOrder: builder.mutation<
        OrderDetails,
        { orderId: string; paymentId: string }
      >({
        query({ orderId, paymentId }) {
          return {
            url: `/${orderId}/pay`,
            method: 'PUT',
            body: { id: paymentId },
          };
        },
      }),

      markOrderDelivered: builder.mutation<
        OrderDetails,
        string
      >({
        query(orderId) {
          return {
            url: `/${orderId}/deliver`,
            method: 'PUT',
          };
        },
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useOrderListQuery,
  usePayOrderMutation,
  useMarkOrderDeliveredMutation,
} = orderApiSlice;
