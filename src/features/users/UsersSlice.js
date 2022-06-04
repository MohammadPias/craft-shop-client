import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../Api/ProductApi';

const initialState = {
    result: {},
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
        },
        updateUsers: (state, { payload }) => {
            const userIndex = state.result?.users?.findIndex(item => item?.email === payload?.email);
            state.result.users[userIndex].role = payload.role
        },
        deleteSingleUser: (state, { payload }) => {
            const tempUsers = state?.result?.users?.filter(item => item.email !== payload.email)
            state.result.users = tempUsers
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

export const { userFilter, updateUsers, deleteSingleUser } = userSlice.actions

export default userSlice.reducer