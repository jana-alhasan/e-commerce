import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../services/productsApi";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ currentPage, productsPerPage, sortBy }) =>
    fetchProducts({ currentPage, productsPerPage, sortBy })
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsLength: 1,
    productLoading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.error?.message || "Unable to load products";
      });
  },
});

export const { setProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.products;
export const productsLength = (state) => state.products.productsLength;
export const selectProductLoading = (state) => state.products.productLoading;
export const selectProductError = (state) => state.products.error;

export default productsSlice.reducer;
