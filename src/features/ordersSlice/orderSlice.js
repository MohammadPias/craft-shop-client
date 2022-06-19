import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { instance } from '../../Api/ProductApi';

const initialState = {
    myOrders: {},
    allOrders: {},
    loading: false,
    error: '',
};
// const { idToken } = useSelector(state => state?.user?.result)

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ({ currPage, orderPerPage, email, filterType }, { getState }) => {
        console.log(getState().user?.result?.idToken, currPage)
        const state = getState()
        const AuthAxios = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                Authorization: `Bearer ${state?.user?.result?.idToken}`
            }
        })
        return AuthAxios.get(`/myOrders?currPage=${currPage}&&orderPerPage=${orderPerPage}&&email=${email}&&filterType=${filterType}`)
            .then(res => res.data)
    }
)
export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async ({ currPage, orderPerPage, filterType }) => {
        console.log(currPage, orderPerPage)
        return instance.get(`/orders?currPage=${currPage}&&orderPerPage=${orderPerPage}&&filterType=${filterType}`)
            .then(res => res.data)
    }
)

const orderSlice = createSlice({
    name: 'second',
    initialState,
    reducers: {
        updateOrders: (state, { payload }) => {
            const tempOrders = state.myOrders?.data?.filter(item => item._id !== payload)
            state.myOrders.data = tempOrders;
            // console.log('temOrders', tempOrders, payload)
        },
        updateAllOrders: (state, { payload }) => {
            if (payload?.action === 'delete') {
                const tempOrders = state.allOrders?.data?.filter(item => item?._id !== payload.orderId)
                state.allOrders.data = tempOrders;
                // console.log('hit from delete', state.allOrders.data)
            }
            else {
                const orderIndex = state.allOrders?.data?.findIndex(item => item?._id === payload.orderId)
                if (orderIndex >= 0) {
                    state.allOrders.data[orderIndex].status = payload.action
                }
                else {

                }
            }
            // console.log(payload)
        },
        updatePayment: (state, { payload }) => {
            const orderIndex = state.myOrders.data?.findIndex(order => order._id === payload.orderId)
            state.myOrders.data[orderIndex].payment = payload
            // order.payment = payload
            console.log(payload, orderIndex)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchOrders.fulfilled, (state, { payload }) => {
                state.myOrders = payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
                state.allOrders = payload;
                state.loading = false;
            })
            .addCase(fetchAllOrders.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
    },
});

export const { updateOrders, updateAllOrders, updatePayment } = orderSlice.actions

export default orderSlice.reducer