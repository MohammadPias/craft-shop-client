import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    result: [],
    totalPrice: 0,
    totalProduct: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const updateProduct = { ...payload?.product, quantity: payload.quantity }
            const cartIndex = state.result.findIndex(product => product._id === payload.product._id);
            if (cartIndex >= 0) {
                state.result[cartIndex].quantity += payload.quantity
            }
            else {
                state.result?.push(updateProduct)
            }
        },
        removeFromCart: (state, { payload }) => {
            const cartIndex = state?.result?.findIndex(product => product._id === payload)
            if (cartIndex >= 0) {
                state.result = state.result?.filter(product => product._id !== payload)

            }
            toast.warn(`This product has been deleted successfully.`)
        },
        countCart: (state) => {
            const { total, items } = state.result.reduce((cartValue, cartItem) => {
                const { price, quantity } = cartItem;
                const totalPrice = price * quantity;
                cartValue.total += totalPrice;
                cartValue.items += quantity

                return cartValue;

            }, {
                total: 0,
                items: 0,
            })
            state.totalPrice = total;
            state.totalProduct = items
        },
        increaseCount: (state, { payload }) => {
            const cartIndex = state?.result?.findIndex(product => product._id === payload)
            if (cartIndex >= 0) {
                state.result[cartIndex].quantity += 1

            }
        },
        decreaseCount: (state, { payload }) => {
            const cartIndex = state?.result?.findIndex(product => product._id === payload)
            if (cartIndex >= 0) {
                state.result[cartIndex].quantity -= 1

            }
        },
        clearCart: (state) => {
            state.result = [];
            toast.warn('Cart has been removed successfully.')
        }
    }
});

export const { addToCart, countCart, removeFromCart, increaseCount, decreaseCount, clearCart } = cartSlice.actions

export default cartSlice.reducer