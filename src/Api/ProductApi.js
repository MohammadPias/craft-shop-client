import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: process.env.REACT_APP_BASE_URL
})