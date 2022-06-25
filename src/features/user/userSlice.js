import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    result: {},

    loading: false,
    error: '',
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
        setRole: (state, action) => {
            state.result.role = action.payload;
        },
        updateUserImage: (state, { payload }) => {
            state.result = { ...state.result, photoURL: payload }

        },
        setIdToken: (state, { payload }) => {
            // console.log(payload)
            state.result.idToken = payload
        }
    }
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logOutUser,
    setRole,
    updateUserImage,
    setIdToken,
} = userSlice.actions;
export const selectUser = state => state.user.result;

export default userSlice.reducer