import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authInstance } from '../../Api/ProductApi';

const initialState = {
    result: {},
    loading: true,
    error: '',
}

export const checkAdmin = createAsyncThunk(
    'users/checkAdmin',
    async (email) => {
        // console.log(email)
        // console.log(getState().user?.result?.idToken, currPage)
        return authInstance.get(`users/checkAmin/${email}`)
            .then(res => res.data)
    }
)

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAdmin.pending, (state) => {
                state.loading = true
            })
            .addCase(checkAdmin.fulfilled, (state, { payload }) => {
                state.result.isAdmin = payload.admin;
                state.loading = false;
            })
            .addCase(checkAdmin.rejected, (state, { error }) => {
                state.error = error.message;
                state.loading = false;
            })
    },
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