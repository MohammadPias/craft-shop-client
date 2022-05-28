import { instance } from '../Api/ProductApi';

const useProducts = () => {

    const getProducts = () => {
        const response = instance.get('products')
        return response;
    }
    return {
        getProducts
    }
};

export default useProducts;