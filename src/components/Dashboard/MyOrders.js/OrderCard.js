import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { toast } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { updateAllOrders, updateOrders } from '../../../features/ordersSlice/orderSlice';

const OrderCard = ({ data, cardView, setCardView, title }) => {
    const [action, setAction] = useState('');
    const [orderId, setOrderId] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user?.result);

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
        <div>
            {
                data?.map((item, index) =>
                    <div
                        key={index}
                        className={`p-3 border border-gray-300 rounded-md mb-2 text-gray-600 ${cardView?._id === item?._id && 'bg-gray-50 text-start'}`}
                    >
                        <h1 className="text-md font-medium">{item?._id}</h1>
                        <div className='flex space-x-5 justify-start mb-2'>
                            <h1 className="text-medium">Price : </h1>
                            <h1 className="text-medium">${item?.totalPrice}</h1>
                        </div>
                        <div className='flex space-x-5 justify-start mb-2'>
                            <h1 className="text-medium">Payment : </h1>
                            <div className='px-3 rounded-full bg-gray-100'>
                                <h1 className="text-medium">{item?.payment?.amount ? 'Paid' : 'Unpaid'}</h1>
                            </div>
                        </div>
                        <div className='flex space-x-5 justify-start mb-2'>
                            <h1 className="text-medium">Status : </h1>
                            <span className={`px-3 py-1 rounded-full ${item?.status === 'processing' ? 'bg-orange-100 text-orange-700' : item?.status === 'delivered' ? 'bg-lime-100 text-lime-600' : item?.status === 'updated' ? 'bg-sky-100 text-sky-700' : 'bg-rose-100 text-rose-700'}`}>
                                {item?.status ? item?.status : 'Pending'}
                            </span>
                        </div>
                        <div className='flex space-x-16 justify-start mb-2'>
                            {
                                user?.role === 'admin' && title === "manageOrders" ?
                                    <div className='flex items-center space-x-5'>
                                        <h1 className=''>Action: </h1>
                                        <select
                                            className='focus:outline-gray-300'
                                            onChange={(e) => {
                                                setOrderId(item?._id)
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
                                    <div>
                                        <i
                                            onClick={() => {
                                                const proceed = window.confirm('Are you sure you want to delete?')
                                                if (proceed) {
                                                    instance.delete(`/orders/${item?._id}`)
                                                        .then(res => {
                                                            toast.warn('Order has been deleted successfully')
                                                            dispatch(updateOrders(item?._id))
                                                        })
                                                }

                                            }}
                                            className="fa-solid fa-trash-can"></i>
                                    </div>
                            }
                            <HashLink to={user?.role === 'admin' && title === "manageOrders" ? '/dashboard/manageOrders#orderDetails' : '/dashboard/myOrders#orderDetails'}>
                                <i
                                    onClick={() => {
                                        setCardView(item)
                                    }}
                                    className={`${cardView._id === data._id ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}`}></i>
                            </HashLink>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default OrderCard;