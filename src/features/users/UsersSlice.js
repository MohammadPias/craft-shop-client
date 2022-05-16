import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../Api/ProductApi';

const initialState = {
    result: [],
    loading: false,
    error: ''
};

export const getUsersAsync = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await instance.get('/users')
            .then(res => res.data)
        return response;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { } = userSlice.actions

export default userSlice.reducer