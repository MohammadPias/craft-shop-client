import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const authInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${Cookies.get("idToken") || ""}`
    }
});

/* REACT_APP_BASE_URL='https://polar-beach-38800.herokuapp.com' */