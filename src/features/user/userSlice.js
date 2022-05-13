import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    result: {},
    loading: false,
    error: '',
    /* displayName: '',
    email: '',
    photoURL: '',
    loading: false,
    error: '',
    admin: '', */
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.result = action.payload;
            state.loading = false;
            state.error = '';
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
        logOutUser: (state) => {
            state.result = {};
        },
        makeAdmin: (state, action) => {
            state.result.role = action.payload;
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure, logOutUser, makeAdmin } = userSlice.actions

export default userSlice.reducer