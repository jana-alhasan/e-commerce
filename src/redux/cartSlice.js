// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updateCartData = createAsyncThunk(
  'cart/updateCartData',
  async ({ userId, productId, quantity, date }) => {
    const cartUpdateData = {
      userId,
      date,
      products: [{ productId, quantity }],
    };

    const response = await fetch(`https://fakestoreapi.com/carts/7`, {
      method: 'PUT',
      body: JSON.stringify(cartUpdateData),
    })
    if (!response.ok) {
      throw new Error(`Failed to update cart. Status: ${response.status}`);
    }
    const jsonResponse = await response.json();

    const updatedCartResponse = await fetch(`https://fakestoreapi.com/carts/${jsonResponse.id}`);
    const updatedCartData = await updatedCartResponse.json();

    return updatedCartData;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    cartLoading: false,
    status: 'idle',
    error: null,
    addedItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex].quantity += 1;
        }
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);

      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          state.items[existingItemIndex].quantity -= 1;
        }
      }
    },
    clearfromCart: (state, action) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);
      state.items.splice(existingItemIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartData.pending, (state) => {
        state.cartLoading = true;
        state.status = 'loading';
        console.log('Cart Update: Loading started');
      })
      .addCase(updateCartData.fulfilled, (state, action) => {
        state.cartLoading = false; 
        state.status = 'succeeded';
        console.log('Updated Cart success:', action.payload);
        console.log('state Cart:', JSON.parse(JSON.stringify(state)));
     
      })
      .addCase(updateCartData.rejected, (state, action) => {
        state.cartLoading = false; 
        state.status = 'failed';
        state.error = action.error.message;
        console.error('Error updating cart:', action.error.message);
      });
  },
});

export const { addToCart, removeFromCart, clearfromCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.items;
export const selectCartStatus = state => state.cart.status;
export const selectCartError = state => state.cart.error;
export const selectCartLoading = state => state.cart.cartLoading; 

export default cartSlice.reducer;
