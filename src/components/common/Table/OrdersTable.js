import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { updateAllOrders, updateOrders } from '../../../features/ordersSlice/orderSlice';

const OrdersTable = ({ tableHead, tableData, cardView, setCardView, title }) => {
    const [action, setAction] = useState('');
    const [orderId, setOrderId] = useState('');
    const user = useSelector(state => state.user?.result)
    const dispatch = useDispatch();

    // console.log(user.role === 'admin')

    useEffect(() => {
        if (orderId || action) {
            if (action === 'delete') {
                const proceed = window.confirm('Are you sure you want to delete?')
                if (proceed) {
                    instance.delete(`/orders/${orderId}`)
                        .then(res => {
                            toast.warn('Order has been deleted successfully')
                            dispatch(updateAllOrders({ orderId, action }))
                        })
                }
            }
            else {
                instance.put(`/orders?id=${orderId}&&action=${action}`)
                    .then(res => {
                        toast.warn('Order status been updated successfully')
                        dispatch(updateAllOrders({ orderId, action }))
                    })
            }
        }
    }, [action, orderId, dispatch])

    return (
        <table className="table-auto w-full overflow-x-scroll">
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
                        // const date = new Date()
                        // console.log((data?.updateStatusTime))
                        // console.log(new Date().toLocaleString())
                        return <tr key={index} className={`border border-gray-200 h-12 p-3 ${cardView._id === data._id && 'bg-gray-50'}`}>
                            <td className='p-5'>
                                <h2>#{data._id}</h2>
                            </td>
                            <td className='p-5'>
                                <h2>${data?.cartEstimate?.total}</h2>
                            </td>
                            <td className='p-5'>
                                <span className={` ${data?.payment?.amount ? "bg-green-100 text-green-700" : 'bg-red-100 text-red-700'} py-1 px-3 rounded-full`}>
                                    {data?.payment?.amount ? 'Paid' : 'Unpaid'}
                                </span>
                            </td>
                            <td className='p-5'>
                                <span className={`px-3 py-1 rounded-full ${data?.status === 'processing' ? 'bg-orange-100 text-orange-700' : data?.status === 'delivered' ? 'bg-lime-100 text-lime-600' : data?.status === 'updated' ? 'bg-sky-100 text-sky-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {data?.status ? data?.status : 'Pending'}
                                </span>
                            </td>
                            <td className='p-5'>
                                {
                                    user?.role === 'admin' && title === "manageOrders" ?
                                        <div>
                                            <select
                                                className='focus:outline-gray-300'
                                                onChange={(e) => {
                                                    setOrderId(data?._id)
                                                    setAction(e.target.value)
                                                }}
                                                name='action'>
                                                <option
                                                    value="select" selected hidden disabled>Select</option>
                                                <option
                                                    value="updated">Update</option>
                                                <option value="processing">Processing</option>
                                                <option
                                                    value="delivered">Delivered</option>
                                                <option
                                                    value="delete">Delete</option>
                                            </select>
                                        </div>
                                        :
                                        <i
                                            onClick={() => {
                                                const proceed = window.confirm('Are you sure you want to delete?')
                                                if (proceed) {
                                                    instance.delete(`/orders/${data?._id}`)
                                                        .then(res => {
                                                            console.log(res)
                                                            toast.warn('Order has been deleted successfully')
                                                            dispatch(updateOrders(data?._id))
                                                        })
                                                }

                                            }}
                                            className="fa-solid fa-trash-can cursor-pointer"></i>
                                }
                            </td>
                            <td className='p-5'>
                                <i
                                    onClick={() => {
                                        setCardView(data)
                                    }}
                                    className={`${cardView._id === data._id ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}  cursor-pointer`}></i>
                            </td>

                        </tr>
                    }

                    )
                }
            </tbody>
        </table >
    );
};

export default OrdersTable;