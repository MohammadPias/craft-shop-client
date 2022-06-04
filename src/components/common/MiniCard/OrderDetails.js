import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetails = ({ order }) => {

    const CardRow = ({ data, title }) => {
        return (
            <div className='text-center text-sm   mb-2 border-b border-b-gray-200 flex items-center justify-between'>
                <h1>{title} : </h1>
                <h1>{data}</h1>
            </div>
        )
    };
    const CardBox = ({ data }) => {
        return (
            <div>
                <Link to={`/productDetails/${data?._id}`}>
                    <div className='flex space-x-2 items-center border-b border-b-gray-200'>
                        <img className='h-8 w-8 object-contain' src={data?.img} alt="" />
                        <h1 className='text-sm text-blue-600'>{data?.title}</h1>
                    </div>
                </Link>
            </div>
        )
    }
    return (
        <div className='p-3 border border-gray-200'>
            <div className='text-center text-md font-medium p-3 bg-gray-100 mb-3'>
                <h1>Order Details</h1>
            </div>
            <CardRow title="Order Id" data={order?._id} />

            <div className='flex items-center justify-between  border-b border-b-gray-200  h-7'>
                <h1 className="">Date :</h1>
                <h1 className="">{order?.createdAtDate?.split(',')[0]}</h1>
            </div>

            {/* <h1 className='text-md font-medium'>Shipping</h1> */}
            <CardRow title="Name" data={order?.shipping?.name} />
            <CardRow title="Email" data={order?.shipping?.email} />
            <CardRow title="Phone" data={order?.shipping?.phone} />
            <CardRow title="Shipping Type" data={order?.shipping?.shippingType} />
            <CardRow title="Address" data={order?.shipping?.address} />
            <div className='mb-2'>
                {
                    order?.result?.map((item, index) => <CardBox key={index} data={item} />)
                }
            </div>
            <div className='flex items-center justify-between px-2  border-b border-b-gray-200 font-medium h-7'>
                <h1 className="text-sm">Total:</h1>
                <h1 className="text-sm">$ {order?.cartEstimate?.total}</h1>
            </div>
            <div className='border-b border-b-gray-200 mb-2 py-2'>
                {
                    order?.payment?.amount ?
                        <button className='btn btn-primary' disabled>Paid</button>
                        :
                        <Link to=''>
                            <button className='btn btn-primary'>Pay</button>
                        </Link>
                }
            </div>
        </div>
    );
};

export default OrderDetails;