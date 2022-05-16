import { async } from '@firebase/util';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../../Api/ProductApi';
import { getUsersAsync } from '../../../features/users/UsersSlice';
import Card from '../../Card/Card';
import Table from '../../Table/Table';

const ManageUsers = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.result)
    console.log(users)

    const handleAdmin = () => {
        const response = instance.put('/users', {
            email: 'email'
        })
    }

    useEffect(() => {
        dispatch(getUsersAsync())

    }, [])
    return (
        <div className=''>
            <div className="bg-gray-100 py-5 px-8 flex justify-between gap-5 items-center flex-col lg:flex-row rounded-md lg:rounded-none shadow">
                <div className='flex space-x-3 items-center'>
                    <p className='text-md font-bold text-gray-600'>User Management</p>
                    <select className='px-5 py-1 rounded-md focus:outline-gray-300' name="" id="">
                        <option value="">All User</option>
                        <option value="">Admins</option>
                    </select>
                </div>
                <div onClick={() => handleAdmin()} className='flex space-x-3 items-center text-gray-600 '>
                    <i class="fa-solid fa-circle-plus text-2xl"></i>
                    <p className='text-md font-bold text-gray-600'>Add Admin</p>
                </div>
            </div>
            <div className=' mt-5 hidden lg:block'>
                <Table data={users} />
            </div>
            <div className='lg:hidden grid grid-cols-1 md:grid-cols-2 mt-5 rounded-md gap-4'>
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default ManageUsers;