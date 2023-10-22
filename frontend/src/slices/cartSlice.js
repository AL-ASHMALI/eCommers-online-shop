import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((y) => y._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((y) =>
          XMLDocument._id === existItem._id ? item : y
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
  },
});

export default cartSlice.reducer;
