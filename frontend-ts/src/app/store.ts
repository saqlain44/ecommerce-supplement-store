import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import { productApiSlice } from '../features/product/productApiSlice';
import { userApiSlice } from '../features/user/userApiSlice';
import { orderApiSlice } from '../features/order/orderApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(orderApiSlice.middleware);
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
