import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAsync } from '../../../features/products/productSlice';
import LoaderComponent from '../../common/Loder/Loder';
import Pagination from '../../common/Pagination/Pagination';
import ProductCard from '../../common/ProductCard/ProductCard';
import DashboardHeader from '../DashboardHeader';

const Shop = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [filterType, setFilerType] = useState('');

    const userPerPage = 8;

    const dispatch = useDispatch();
    const { loading, result } = useSelector(state => ({ ...state.products }))
    const { count, products } = result;

    console.log(filterType)
    useEffect(() => {
        setTotalPage(Math.ceil(count / userPerPage))
        dispatch(getProductAsync({ currPage, userPerPage, filterType }))


    }, [dispatch, currPage, userPerPage, filterType, count])

    return (
        <div>
            <DashboardHeader
                title='Shop'
                setFilerType={setFilerType}
                filterType={filterType}
                filterTitle='category'
                value={[
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
                                products?.slice(0, 8).map(product =>
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
    );
};

export default Shop;