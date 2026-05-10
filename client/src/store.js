import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    products: productReducer, 
    cart: cartReducer,
    auth: authSliceReducer,
  },
});