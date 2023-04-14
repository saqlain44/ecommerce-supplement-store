import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const productListApiSlice = createApi({
  reducerPath: 'productListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
  }),
  endpoints(builder) {
    return {
      fetchProductList: builder.query<ProductList, number | void>({
        query(page = 1) {
          return `?category=&pageNumber=${page}`;
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
    };
  },
});

export const { useFetchProductListQuery, useFetchProductTopListQuery, useFetchProductLatestListQuery } =
  productListApiSlice;
