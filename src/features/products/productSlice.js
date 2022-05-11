import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../Api/ProductApi';

const initialState = {
  result: [],
  loading: false,
  error: ''
};
export const getProductAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await instance.get('products')
      .then(res => res.data.result)
    return response;
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
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
        state.error = action.error.message;
      });
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;
export const selectProduct = (state) => state.products.result;

/* export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
}; */

export default productSlice.reducer;
