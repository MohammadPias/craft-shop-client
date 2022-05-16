import React from 'react';
import logo from '../../images/favicon.png'

const Card = (data) => {
    return (
        <div className='bg-secondary p-5 flex space-x-3 items-center rounded-md shadow'>
            <div className='h-16 w-16 rounded-full bg-white p-2 ring-2 ring-green-600 relative'>
                <img className='w-full rounded-full' src={logo} alt="" />
                {/* <div className="h-4 w-4 rounded-full bg-green-500 absolute top-0.5 left-0"></div> */}
            </div>
            <div className='flex flex-col space-y-0.5'>
                <h1 className='text-md font-bold text-gray-700'>Title</h1>
                <h1 className='text-sm font-bold text-gray-500'>Sub-Title</h1>
                <div className='flex justify-between space-x-5'>
                    <span className='bg-red-300 text-red-900 px-2 pb-1 font-medium rounded-full text-sm'>delete</span>
                    <span className='bg-lime-300 text-lime-900 px-2 pb-1 font-medium rounded-full text-sm'>edit</span>

                </div>
            </div>
        </div>
    );
};

export default Card;