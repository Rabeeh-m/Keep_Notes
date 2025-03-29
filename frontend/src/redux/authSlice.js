
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login as loginApi } from '../services/api';

const accessToken = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');
const storedUser = localStorage.getItem('user');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  status: 'idle',
  error: null,
  accessToken: accessToken || null,
  refreshToken: refreshToken || null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    },
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      localStorage.setItem('access_token', action.payload.access);
      localStorage.setItem('refresh_token', action.payload.refresh);
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store user info
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          user_id: action.payload.user_id,
          user_name: action.payload.user_name,
          user_email: action.payload.user_email,
        };
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        localStorage.setItem('access_token', action.payload.access);
        localStorage.setItem('refresh_token', action.payload.refresh);
        localStorage.setItem('user', JSON.stringify(state.user)); // Persist user
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          user_id: action.payload.user_id,
          user_name: action.payload.user_name,
        };
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        localStorage.setItem('access_token', action.payload.access);
        localStorage.setItem('refresh_token', action.payload.refresh);
        localStorage.setItem('user', JSON.stringify(state.user)); // Persist user
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
