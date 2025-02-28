import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, login, logout } from '../actions/clientActions';
import { IAuthState } from '../types';

export const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isARegistrated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.isARegistrated = true;
          state.error = null;
        } else {
          state.user = null;
          state.isARegistrated = false;
          state.error = 'Ошибка регистрации';
        }
      })
      .addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;

        state.error = (action.payload as string) || 'Ошибка регистрации';
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка входа';
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка выхода';
      });
  },
});

export default authSlice.reducer;
