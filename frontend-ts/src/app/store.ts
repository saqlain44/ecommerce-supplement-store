import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { productListApiSlice } from '../features/product/productApiSlice';

export const store = configureStore({
  reducer: {
    [productListApiSlice.reducerPath]: productListApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productListApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
