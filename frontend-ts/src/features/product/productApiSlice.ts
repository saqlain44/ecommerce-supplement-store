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

export interface ProductTrendingList {
  products: Product[];
}

type TrendingProduct = 'protein' | 'bcaa';

export const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
  }),
  endpoints(builder) {
    return {
      fetchProductList: builder.query<ProductList, { keyword?: string; page?: number; category?: string; }>({
        query({ keyword = '', page = 1, category = ''}) {
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
    };
  },
});

export const {
  useFetchProductListQuery,
  useFetchProductTopListQuery,
  useFetchProductLatestListQuery,
  useFetchProductTrendingListQuery,
  useFetchProductDetailQuery,
} = productApiSlice;
