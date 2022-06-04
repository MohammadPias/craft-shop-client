import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductAsync } from '../../../features/products/productSlice';
import LoaderComponent from '../../common/Loder/Loder';
import ProductCard from '../../common/ProductCard/ProductCard';

const HomeProducts = () => {
    const dispatch = useDispatch();
    const { loading, result } = useSelector(state => ({ ...state.products }))
    const [currPage, setCurrPage] = useState();
    const [filterType, setFilterType] = useState();
    const [productPerPage, setProductPerPage] = useState();

    useEffect(() => {
        dispatch(getProductAsync({ currPage, productPerPage, filterType }));
        console.log('from home products')
    }, [dispatch])
    // console.log(products)
    return (
        <div>
            <div className="heading">
                <h3>Top Products</h3>
            </div>
            {
                loading ?
                    <LoaderComponent />
                    :
                    <div className='sm:container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-5 mt-6'>
                        {
                            result?.products?.slice(0, 8).map(product =>
                                <ProductCard key={product._id} product={product} />
                            )
                        }
                    </div>
            }
            <div className='sm:container flex justify-end px-5'>
                <Link to='shop'>
                    <button className="btn btn-primary h-10">See More</button>
                </Link>
            </div>
        </div>
    );
};

export default HomeProducts;