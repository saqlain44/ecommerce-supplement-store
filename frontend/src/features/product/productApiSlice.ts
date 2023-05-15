import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../app/store';

export interface Product {
  __v: number;
  _id: string;
  brand: string;
  category: string;
  countInStock: number;
  createdAt: string;
  description: string;
  image: string;
  name: string;
  numReviews: number;
  price: number;
  rating: number;
  reviews: Record<string, string>[];
  updatedAt: string;
  user: string;
}

export interface ProductList {
  page: number;
  pages: number;
  products: Product[];
}

export interface ProductLatestList {
  products: Product[];
}

export interface ProductTrendingList {
  products: Product[];
}

type TrendingProduct = 'protein' | 'bcaa';

export const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
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
      fetchProductList: builder.query<
        ProductList,
        { keyword?: string; page?: number; category?: string }
      >({
        query({ keyword = '', page = 1, category = '' }) {
          return `?category=${category}&pageNumber=${page}&keyword=${keyword}`;
        },
      }),

      fetchProductTopList: builder.query<Product[], boolean | void>({
        query() {
          return '/top';
        },
      }),

      fetchProductLatestList: builder.query<ProductLatestList, boolean | void>({
        query() {
          return '/latest';
        },
      }),

      fetchProductTrendingList: builder.query<
        ProductTrendingList,
        TrendingProduct
      >({
        query(category) {
          return `/trending?category=${category}`;
        },
      }),

      fetchProductDetail: builder.query<Product, string>({
        query(id) {
          return `/${id}`;
        },
      }),

      createProduct: builder.mutation<Product, boolean | void>({
        query() {
          return { url: '/', method: 'POST' };
        },
      }),

      updateProduct: builder.mutation<
        Product,
        {
          name: string;
          price: number;
          image: string;
          description: string;
          brand: string;
          category: string;
          countInStock: number;
          id: string;
        }
      >({
        query(args) {
          return { url: `/${args.id}`, method: 'PUT', body: { ...args } };
        },
      }),

      deleteProduct: builder.mutation<string, string>({
        query(productId) {
          return { url: `/${productId}`, method: 'DELETE' };
        },
      }),
    };
  },
});

export const {
  useFetchProductListQuery,
  useFetchProductTopListQuery,
  useFetchProductLatestListQuery,
  useFetchProductTrendingListQuery,
  useFetchProductDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
