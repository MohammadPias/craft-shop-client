import axios from 'axios';
import { useSelector } from 'react-redux';

const usePrivateAxios = () => {
    const user = useSelector(state => state?.user?.result)
    const privateInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            Authorization: `Bearer ${user?.idToken}`
        }
    })
    return privateInstance;
};

export default usePrivateAxios;