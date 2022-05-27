import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalIsOpen: false,
    value: {},
    refresh: false,
}

const mySlice = createSlice({
    name: 'second',
    initialState,
    reducers: {
        modalOpen: (state, { payload }) => {
            state.modalIsOpen = true;
            state.Value = payload;
        },
        modalClose: (state) => {
            state.modalIsOpen = false;
        },
        setRefresh: (state) => {
            state.refresh ? state.refresh = false : state.refresh = true;
        }
    }
});

export const { modalOpen, modalClose, setRefresh } = mySlice.actions

export default mySlice.reducer