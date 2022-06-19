import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { getProductAsync, updateProducts } from '../../../features/products/productSlice';
import LoaderComponent from '../../common/Loader/Loader';
import Pagination from '../../common/Pagination/Pagination';
import TableComponent from '../../common/Table/TableComponent';

const AllProducts = () => {
    const [totalPage, setTotalPage] = useState(1);
    const [currPage, setCurrPage] = useState(0)
    const filterType = 'allProducts'

    const dispatch = useDispatch();
    const { result, loading } = useSelector(state => ({ ...state?.products }))
    // const  = useSelector(state => state?.products?.result)
    const productPerPage = 5;
    const totalProduct = result?.count
    console.log(result?.products)
    useEffect(() => {
        setTotalPage(Math.ceil(totalProduct / productPerPage))
        dispatch(getProductAsync({ currPage, productPerPage, filterType }))
    }, [currPage, productPerPage, filterType, totalProduct, dispatch])

    const handleDelete = (id) => {
        const proceed = window.confirm("Are sure you want to delete this product?")
        if (proceed) {
            instance.delete(`/products/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res?.data?.deletedCount > 0) {
                        dispatch(updateProducts(id))
                        toast.warn('Product deleted successfully')
                    }
                })
        }
    }

    return (
        <div className='mt-6'>
            <div>
                {
                    loading ?
                        <LoaderComponent />
                        :
                        <div>
                            <div className='hidden lg:block'>
                                <TableComponent
                                    title='allProducts'
                                    tableHead={['Product Name', 'Price', 'Date', 'View', 'Action']}
                                    tableData={
                                        result?.products &&
                                        result?.products?.map((item, index) => [item.title, item.img, item.price, item?.date, item._id, item?.createdAtDate, item?.image])
                                    }
                                />
                            </div>
                            <div className='lg:hidden grid grid-cols-1 gap-3'>
                                {
                                    result?.products &&
                                    result?.products?.map(item =>
                                        <div key={item?._id} className='text-center p-3 border border-gray-200 shadow-sm'>
                                            <img className='w-20 h-20 rounded-full mx-auto object-contain' src={item?.image ? `data:image/png;base64, ${item?.image}` : item?.img} alt="" />
                                            <h1 className='font-medium text-sm'>{item?.title}</h1>
                                            <h2 className='mt-2'>Price: $<span className='font-bold'>{item?.price}</span></h2>
                                            <div className='flex space-x-3 items-center justify-center mt-2'>
                                                <Link to={`/productDetails/${item?._id}`}>
                                                    <div
                                                        className='text-sm rounded-full bg-green-50 text-green-700 px-2'>Detail</div>
                                                </Link>
                                                <div
                                                    onClick={() => handleDelete(item?._id)}
                                                    className='text-sm rounded-full bg-red-50 text-red-700 px-2'>Delete</div>
                                                <Link to={`${item?._id}`}>
                                                    <div
                                                        onClick={''}
                                                        className='text-sm rounded-full bg-blue-50 text-blue-700 px-2'>Edit</div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                }
            </div>
            <Pagination
                totalPage={totalPage}
                setCurrPage={setCurrPage}
                currPage={currPage}
            />
        </div>
    );
};

export default AllProducts;