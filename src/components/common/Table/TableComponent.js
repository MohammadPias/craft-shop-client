import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { decreaseCount, increaseCount, removeFromCart } from '../../../features/cartSlice/cartSlice';
import { updateProducts } from '../../../features/products/productSlice';

const TableComponent = ({ tableHead, tableData, title }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    return (
        <table className="table-auto w-full">
            <thead className='bg-gray-100 border border-gray-300 rounded-md text-sm font-medium h-14 text-gray-700 text-left'>
                <tr>
                    {
                        tableHead?.length > 0 &&
                        tableHead?.map((head, index) =>
                            <th key={index} className='p-5'>{head}</th>)
                    }
                </tr>
            </thead>
            <tbody className='text-left text-gray-500'>
                {
                    tableData?.length > 0 &&

                    tableData?.map((data, index) => {
                        // console.log(data)
                        return <tr key={index} className={`border border-gray-200 h-12 ${index % 2 && 'bg-white'} p-3`}>
                            <td className='p-5'>
                                <div className='flex space-x-2 items-center'>
                                    <img className='h-20 w-20 object-contain' src={`${data[6] ? `data:image/png;base64, ${data[6]}` : data[1]}`} alt="" />
                                    <h2>{data[0]}</h2>
                                </div>
                            </td>
                            <td className='p-5'>${data[2]}</td>
                            {
                                title === 'allProducts' ?
                                    <td>
                                        {data[3] ? data[3] : data[5]}
                                    </td>
                                    :
                                    <td className='p-5'>
                                        <div className='flex'>
                                            <button
                                                disabled={data[3] <= 1 && true}
                                                onClick={() => dispatch(decreaseCount(data[4]))}
                                                className='w-8 h-8 bg-secondary-deep text-sm rounded-full text-gray-600' >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>

                                            <input
                                                className='w-8 h-8  text-md font-medium text-center focus:outline-none ml-2'
                                                type="number"
                                                readOnly
                                                value={data[3]}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            />

                                            <button
                                                onClick={() => dispatch(increaseCount(data[4]))}
                                                className='w-8 h-8 bg-secondary-deep text-sm rounded-full text-gray-600' >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                            }
                            <td className='p-5'>
                                <Link to={`/productDetails/${data[4]}`} >
                                    <i
                                        onClick={() => { }}
                                        className="fa-solid fa-eye"></i>
                                </Link>
                            </td>
                            <td className='p-5'>
                                <i
                                    onClick={() => {
                                        const proceed = window.confirm("Are sure you want to delete this product?")
                                        if (proceed) {
                                            if (title === 'allProducts') {
                                                instance.delete(`/products/${data[4]}`)
                                                    .then(res => {
                                                        console.log(res.data)
                                                        if (res?.data?.deletedCount > 0) {
                                                            dispatch(updateProducts(data[4]))
                                                            toast.warn('Product deleted successfully')
                                                        }
                                                    })
                                            } else {
                                                dispatch(removeFromCart(data[4]))
                                            }
                                        }
                                    }}
                                    className="fa-solid fa-trash-can cursor-pointer"></i>
                                {
                                    title === 'allProducts' &&
                                    <Link to={`${data[4]}`} className='ml-5' >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                }
                            </td>
                        </tr>
                    }

                    )
                }
            </tbody>
        </table>
    );
};

export default TableComponent;