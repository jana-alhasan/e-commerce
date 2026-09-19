import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async ({ currentPage, productsPerPage, sortBy }) => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products',
        {
          params: {
            limit: productsPerPage * currentPage,
            sort: sortBy,
          },
        }
      );

      const data = response.data;
      if (data && data.length > 0 && Array.isArray(data)) {
        return data;
      } else {
        console.error("Invalid data format:", data);

      }
    } catch (error) {
      console.error('Error fetching all products:', error);

    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsLength: 1,
    productLoading: false,
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
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.productLoading = false;
      });
  },
});

export const { setProducts } = productsSlice.actions; 
export const selectProducts = (state) => state.products.products;
export const productsLength = (state) => state.products.productsLength
export const selectProductLoading = (state) => state.products.productLoading;

export default productsSlice.reducer;
