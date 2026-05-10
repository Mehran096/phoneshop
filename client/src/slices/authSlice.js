import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get userInfo from localStorage
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

// Async logout
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.error(err);
  }
  localStorage.removeItem('userInfo');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.userInfo = null;
    });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;