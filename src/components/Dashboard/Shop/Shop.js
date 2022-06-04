import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAsync } from '../../../features/products/productSlice';
import LoaderComponent from '../../common/Loder/Loder';
import Pagination from '../../common/Pagination/Pagination';
import ProductCard from '../../common/ProductCard/ProductCard';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import DashboardHeader from '../DashboardHeader';

const Shop = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [filterType, setFilerType] = useState('all');

    const productPerPage = 8;

    const dispatch = useDispatch();
    const { loading, result } = useSelector(state => ({ ...state.products }))
    const { count, basketCount, footwearCount, products } = result;

    /*  const randomArray = (products) => {
         return Array.from({ length: products.length }, () => products[Math.floor(Math.random() * products.length)]);
     }
     console.log(randomArray(products)) */

    // console.log(basketCount, footwearCount, filterType)

    useEffect(() => {
        if (filterType === 'basket') {
            setTotalPage(Math.ceil(basketCount / productPerPage))
            dispatch(getProductAsync({ currPage, productPerPage, filterType }))

        }
        else if (filterType === 'footwear') {
            setTotalPage(Math.ceil(footwearCount / productPerPage))
            dispatch(getProductAsync({ currPage, productPerPage, filterType }))
        }
        else {
            setTotalPage(Math.ceil(count / productPerPage))
            dispatch(getProductAsync({ currPage, productPerPage, filterType }))
        }


    }, [dispatch,
        currPage,
        productPerPage,
        filterType,
        count,
        basketCount,
        footwearCount])

    return (
        <div>
            <Header />
            <div className='mt-5 px-3 lg:container lg:mt-20'>
                <DashboardHeader
                    title='Shop'
                    setFilerType={setFilerType}
                    filterType={filterType}
                    filterTitle='category'
                    value={[
                        { value: 'all', label: 'All' },
                        { value: 'basket', label: 'Basket' },
                        { value: 'footwear', label: 'Foot Wear' },
                    ]}
                />

                <div>
                    {
                        loading ?
                            <div className='flex justify-center items-center'>
                                <LoaderComponent />
                            </div>
                            :
                            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6'>
                                {
                                    products?.map(product =>
                                        <ProductCard key={product._id} product={product} />
                                    )
                                }
                            </div>
                    }
                </div>
                <Pagination
                    currPage={currPage}
                    totalPage={totalPage}
                    setCurrPage={setCurrPage}
                // setAdminCurrPage={setAdminCurrPage}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Shop;