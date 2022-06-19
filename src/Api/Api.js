import axios from 'axios';
import { useSelector } from 'react-redux';

export const Api = () => {
    const user = useSelector(state => state?.user?.result)
    console.log(user.idToken)
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            Authorization: `Bearer ${user?.idToken}`
        }
    })
};

// export default Api;