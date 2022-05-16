import { combineReducers } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import userReducer from '../features/user/userSlice';
import usersReducer from '../features/users/UsersSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    users: usersReducer,
})