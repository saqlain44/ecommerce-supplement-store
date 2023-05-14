import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../user/userApiSlice';

const user = localStorage.getItem('user'); 

interface AuthState {
  user?: User | null;
}

const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
