export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate the items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //Calculate the shipping price (if order is above £50 then shipping is free, else £4.99 for shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 50 ? 0 : 4.99);

  //Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
