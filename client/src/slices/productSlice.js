import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all products for HomeScreen
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const { data } = await axios.get('/api/products');
  return data;
});

// Fetch single product for ProductScreen
export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [], // for all products
    product: {}, // for single product
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts cases
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchProductById cases
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;