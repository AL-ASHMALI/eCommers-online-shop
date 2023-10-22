import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

//helper function to display the prices to the correct decimal places
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((y) => y._id === item._id); //checks if the item is already in the cart

      if (existItem) {
        //update the quantity
        state.cartItems = state.cartItems.map((y) =>
          XMLDocument._id === existItem._id ? item : y
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate the items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //Calculate the shipping price (if order is above £50 then shipping is free, else £4.99 for shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 50 ? 0 : 4.99);

      // Calculate tax price (20% tax)
      state.taxPrice = addDecimals(Number((0.2 * state.itemsPrice).toFixed(2)));

      //Calculate total price
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
