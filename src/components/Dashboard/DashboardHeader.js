import React from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { modalOpen } from '../../features/mySlice/mySlice';

const DashboardHeader = ({ title, setFilerType, filterType, value, filterTitle }) => {
    const dispatch = useDispatch();
    return (
        <div className="bg-gray-100 py-5 px-8 flex justify-between gap-5 items-center flex-col lg:flex-row rounded-md lg:rounded-none shadow">

            {/* user management============ */}
            <div className='flex space-x-3 items-center'>
                <p className='text-md font-bold text-gray-600'>{title}</p>
                <Select
                    className='w-full'
                    name={filterTitle}
                    defaultValue={filterType}
                    onChange={(selectedOption) => setFilerType(selectedOption.value)}
                    options={value}
                />
            </div>
            {
                title === 'User Management' || 'Product Management' &&

                <div onClick={() => dispatch(modalOpen())} className='flex space-x-3 items-center text-gray-600 cursor-pointer'>
                    <i className="fa-solid fa-circle-plus text-2xl"></i>
                    <p className='text-md font-bold text-gray-600'>
                        {
                            title === 'User Management' ? 'Add Admin' : 'Add Product'
                        }
                    </p>
                </div>
            }
        </div>
    );
};

export default DashboardHeader;