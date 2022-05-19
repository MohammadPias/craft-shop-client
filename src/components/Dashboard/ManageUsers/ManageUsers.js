import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { adminCount, count, getUsersAsync, } from '../../../features/users/UsersSlice';
import Card from '../../Card/Card';
import LoaderComponent from '../../common/Loder/Loder';
import ModalShow from '../../common/Modal/Modal';
import Table from '../../Table/Table';

const ManageUsers = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userType, setUserType] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);

    const dispatch = useDispatch();
    const totalUsers = useSelector(count);
    const totalAdmins = useSelector(adminCount);
    // console.log(totalUsers, totalAdmins)
    const { loading, result } = useSelector((state) => ({ ...state.users }));

    const userPerPage = 3;
    console.log(result?.users)

    useEffect(() => {
        const search = 'users';
        dispatch(getUsersAsync({ currPage, userPerPage, search }));
        setTotalPage(Math.ceil(totalUsers / userPerPage))

        if (userType === 'admins') {
            const search = 'admin';
            setTotalPage(Math.ceil(totalAdmins / userPerPage));
            dispatch(getUsersAsync({ currPage, userPerPage, search }));
        }
        else {
            console.log('all users')
        }

    }, [currPage,
        dispatch,
        totalPage,
        userType,
        totalAdmins,
        totalUsers])
    return (
        <>
            {
                loading ?
                    <LoaderComponent />
                    :
                    <div className=''>
                        <ToastContainer />
                        <ModalShow
                            modalIsOpen={modalIsOpen}
                            setModalIsOpen={setModalIsOpen}
                        />
                        <div className="bg-gray-100 py-5 px-8 flex justify-between gap-5 items-center flex-col lg:flex-row rounded-md lg:rounded-none shadow">
                            <div className='flex space-x-3 items-center'>
                                <p className='text-md font-bold text-gray-600'>User Management</p>
                                <select
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setUserType(e.target.value)
                                    }}
                                    className='px-5 py-1 rounded-md focus:outline-gray-300' name="users" id="">
                                    <option value="" hidden>Filter Users</option>
                                    <option value="allUsers">All User</option>
                                    <option value="admins">Admins</option>
                                </select>
                            </div>
                            <div onClick={() => setModalIsOpen(true)} className='flex space-x-3 items-center text-gray-600 cursor-pointer'>
                                <i className="fa-solid fa-circle-plus text-2xl"></i>
                                <p className='text-md font-bold text-gray-600'>Add Admin</p>
                            </div>
                        </div>
                        <div className=' mt-5 hidden lg:block'>
                            <Table data={result?.users} setRefresh={setRefresh} />
                        </div>
                        <div className='lg:hidden grid grid-cols-1 md:grid-cols-2 mt-5 rounded-md gap-4'>
                            {
                                result?.users?.map((user, index) => <Card key={index} data={user} />)
                            }
                        </div>
                        <div className='flex justify-center p-10'>
                            {
                                [...Array(totalPage)?.keys()]?.map(page => <button
                                    key={page}
                                    onClick={() => setCurrPage(page)}
                                    className={`h-10 w-10 rounded-full mr-3 bg-secondary-deep  ${page === currPage && 'bg-primary text-white'} font-bold text-gray-600`}
                                >{page + 1}</button>)
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default ManageUsers;