import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { getProductAsync, selectProduct } from '../../../features/products/productSlice';
import ProductCard from './ProductCard';

const HomeProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProduct)
    useEffect(() => {
        dispatch(getProductAsync());

    }, [])
    // console.log(products)
    return (
        <div>
            <div className="heading">
                <h3>Top Products</h3>
            </div>
            {
                products?.length === 0 ?
                    <div className='flex justify-center items-center h-10'>
                        <HashLoader color='#c5986b' loading />
                    </div>
                    :
                    <div className='sm:container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
                        {
                            products?.slice(0, 8).map(product =>
                                <ProductCard key={product._id} product={product} />
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default HomeProducts;