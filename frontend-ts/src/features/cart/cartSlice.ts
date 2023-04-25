import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cart = localStorage.getItem('cart');

export type CartItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

interface CartState {
  cartItems?: CartItem[] | null;
  shippingAddress?: ShippingAddress | null;
  paymentMethod?: string | null;
}

const initialState: CartState = cart
  ? JSON.parse(cart)
  : { cartItems: null, shippingAddress: null, paymentMethod: null };

const updateLocalStorage = (cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      // check of the state.cartItems is null
      if (state.cartItems) {
        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          );
        } else {
          state.cartItems.push(item);
        }
      } else {
        state.cartItems = [item];
      }
      updateLocalStorage(state);
    },

    removeItem(state, action: PayloadAction<string>) {
      if (state.cartItems) {
        state.cartItems = state.cartItems.filter(
          (x) => x.product !== action.payload
        );
      }
      updateLocalStorage(state);
    },

    saveShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
      updateLocalStorage(state);
    },

    cartResetItems(state) {
      state.cartItems = null;
      updateLocalStorage(state);
    },

    cartResetAll(state) {
      state.cartItems = null;
      state.shippingAddress = null;
      updateLocalStorage(state);
    },

    savePaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
      updateLocalStorage(state);
    },
  },
});

export const {
  addItem,
  removeItem,
  saveShippingAddress,
  cartResetItems,
  cartResetAll,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
