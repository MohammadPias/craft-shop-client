import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../Api/ProductApi';

const initialState = {
    data: [],
    loading: false,
    error: '',
};
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        instance.get('/orders')
            .then(res => console.log(res))
    }
)

const orderSlice = createSlice({
    name: 'second',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchOrders.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
    }
});

export const { } = orderSlice.actions

export default orderSlice.reducer