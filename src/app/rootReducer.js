import { combineReducers } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice';
import userReducer from '../features/user/userSlice';
import usersReducer from '../features/users/UsersSlice';
import myReducer from '../features/mySlice/mySlice';
import cartReducer from '../features/cartSlice/cartSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    users: usersReducer,
    myActions: myReducer,
    cart: cartReducer,
})