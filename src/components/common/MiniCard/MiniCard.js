import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { decreaseCount, increaseCount, removeFromCart } from '../../../features/cartSlice/cartSlice';

const MiniCard = ({ data }) => {
    const dispatch = useDispatch();
    return (
        <div>
            {
                data?.length === 0 ?
                    'loading...'
                    :
                    data?.map(value => {
                        return <div
                            className='p-5 border border-gray-200 shadow-sm my-5 text-start'
                            key={value[4]}
                        >
                            <div className='flex flex-col justify-center items-center space-y-3'>
                                <img className='w-26 h-26 object-contain rounded-full transform hover:scale-105 transition duration-500' src={value[1]} alt="" />
                                <h1 className="text-md font-bold">{value[0]}</h1>
                            </div>
                            <h1 className='text-md font-medium mt-5'>Price: ${value[2]}</h1>
                            <div className='flex justify-start mt-2 items-center'>
                                <h1 className='text-md font-medium mr-3'>Quantity : </h1>
                                <button
                                    disabled={value[3] <= 1 && true}
                                    onClick={() => dispatch(decreaseCount(value[4]))}
                                    className='w-8 h-8 bg-secondary-deep text-sm rounded-full text-gray-600' >
                                    <i className="fa-solid fa-minus"></i>
                                </button>

                                <input
                                    className='w-8 h-8  text-md font-medium text-center focus:outline-none ml-2'
                                    type="number"
                                    readOnly
                                    value={value[3]}
                                />

                                <button
                                    onClick={() => dispatch(increaseCount(value[4]))}
                                    className='w-8 h-8 bg-secondary-deep text-sm rounded-full text-gray-600' >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div className='flex  mt-2'>
                                <Link to={`/productDetails/${value[4]}`} >
                                    <button
                                        className="btn bg-orange-200 rounded-full mr-3 text-orange-700">View</button>
                                </Link>

                                <button
                                    onClick={() => {
                                        const proceed = window.confirm("Are sure you want to delete this product?")
                                        if (proceed) {
                                            dispatch(removeFromCart(value[4]))
                                        }
                                    }}
                                    className="btn bg-green-200 rounded-full mr-3 text-green-700">Delete</button>
                            </div>
                        </div>
                    })
            }
        </div>
    );
};

export default MiniCard;