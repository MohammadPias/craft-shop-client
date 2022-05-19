import React from 'react';
import userImg from '../../images/user.png'

const Card = ({ data }) => {

    return (
        <div className='bg-secondary p-5 flex space-x-3 items-center rounded-md shadow'>
            <div className='h-16 w-16 rounded-full bg-white p-1 ring-2 ring-green-600 relative flex-shrink-0
            '>
                <img className='w-full rounded-full' src={data?.photoURL ? data?.photoURL : userImg} alt="" />
            </div>
            <div className='flex flex-col space-y-2 overflow-auto'>
                <h1 className='text-md font-bold text-gray-700 break-words'>{data?.displayName}</h1>

                <h1 className='text-sm font-medium text-gray-500'>{data?.email} </h1>
                <div className='flex justify-between space-x-5'>
                    <span className='bg-red-300 text-red-900 px-2 pb-1 font-medium rounded-full text-sm'>delete</span>
                    <span className='bg-lime-300 text-lime-900 px-2 pb-1 font-medium rounded-full text-sm'>edit</span>

                </div>
            </div>
        </div>
    );
};

export default Card;