import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../Api/ProductApi';

const initialState = {
    result: [],
    loading: false,
    error: ''
};

export const getUsersAsync = createAsyncThunk(
    'users/fetchUsers',
    async ({ currPage, userPerPage, userType }) => {
        const response = await instance.get(`/users?currPage=${currPage}&&userPerPage=${userPerPage}&&search=${userType}`)
            .then(res => res.data)
        return response;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userFilter: (state, action) => {
            state.result = action.payload
        }
    },
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

export const selectUsers = state => state.users?.result?.users;
export const count = state => state.users?.result?.count;
export const adminCount = state => state.users?.result?.adminCount;

export const { userFilter } = userSlice.actions

export default userSlice.reducer