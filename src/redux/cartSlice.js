import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartLoading: false,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      if (!newItem || newItem.id === undefined || newItem.id === null) {
        return;
      }

      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (!existingItem) {
        return;
      }

      if (existingItem.quantity <= 1) {
        state.items = state.items.filter((item) => item.id !== productId);
      } else {
        existingItem.quantity -= 1;
      }
    },
    clearfromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearfromCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectCartLoading = (state) => state.cart.cartLoading;

export default cartSlice.reducer;
