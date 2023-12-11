import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productLoading: false, 
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductLoading: (state, action) => {
      state.productLoading = action.payload; 
    },
  },
});

export const { setProducts, setProductLoading } = productsSlice.actions; 
export default productsSlice.reducer;
