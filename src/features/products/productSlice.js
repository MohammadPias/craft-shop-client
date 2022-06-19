import { async } from '@firebase/util';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../Api/ProductApi';

const initialState = {
  result: {},
  loading: false,
  error: ''
};
export const getProductAsync = createAsyncThunk(
  'products/fetchProducts',
  async ({ currPage, productPerPage, filterType }) => {
    const response = await instance.get(`/products?currPage=${currPage}&&productPerPage=${productPerPage}&&filterType=${filterType}`)
      .then(res => res.data)
    return response;
  }
);

export const searchProductAsync = createAsyncThunk(
  '/product/fetchSearchProducts',
  async ({ search }) => {
    const response = await instance.get(`/searchProducts?search=${search}`)
      .then(res => res.data)
    return response;
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, { payload }) => {
      console.log(payload)
      if (payload?.title) {
        state.result.products.push = payload
      }
      else {
        const products = state?.result?.products?.filter(item => item?._id !== payload)
        state.result.products = products;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(searchProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(searchProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      });
  },
});

export const { updateProducts } = productSlice.actions;
export const selectProduct = (state) => state.products.result;

export default productSlice.reducer;
