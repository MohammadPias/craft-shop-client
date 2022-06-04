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
        updateUser: (state, { payload }) => {
            // state.result = { ...state.result, role: payload }
            // state.result.displayName = payload.displayName;
            // state.result.email = payload.email;
            // state.result.role = payload.role;

        }
    }
});

export const { loginRequest, loginSuccess, loginFailure, logOutUser, setRole, updateUser } = userSlice.actions;
export const selectUser = state => state.user.result;

export default userSlice.reducer