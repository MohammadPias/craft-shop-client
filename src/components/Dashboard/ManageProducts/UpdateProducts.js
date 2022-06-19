import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../../Api/ProductApi';
import ProductModal from '../../common/Modal/ProductModal';

const UpdateProducts = () => {
    const [product, setProduct] = useState({})
    const { productId } = useParams();
    // console.log(productId, product)
    useEffect(() => {
        if (productId) {
            instance.get(`/products/${productId}`)
                .then(res => setProduct(res.data))
        }
    }, [productId]);
    return (
        <div>
            {
                product?._id &&
                <ProductModal product={product} title='updateProduct' data />
            }
        </div>
    );
};

export default UpdateProducts;