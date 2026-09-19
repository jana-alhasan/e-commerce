import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogin } from '../services/authApi';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  try {
    const response = await fetchLogin(credentials);
    console.log('API responseee:', response?.token);
    return response?.token;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error('No response received');
    } else {
      throw new Error('Error setting up the request');
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('API response:', action.payload);
        state.user = { token: action.payload || null };
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.error = "Sorry! Wrong username or password, please try again";
      })
 
  },
});
export const { resetUser } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
