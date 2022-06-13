import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { adminCount, count, getUsersAsync, } from '../../../features/users/UsersSlice';
import Card from '../../Card/Card';
import LoaderComponent from '../../common/Loder/Loder';
import ModalShow from '../../common/Modal/Modal';
import Pagination from '../../common/Pagination/Pagination';
import Table from '../../Table/Table';
import DashboardHeader from '../DashboardHeader';

const ManageUsers = () => {
    const [userType, setUserType] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    // const [adminCurrPage, setAdminCurrPage] = useState(0);

    const dispatch = useDispatch();
    const totalUsers = useSelector(count);
    const totalAdmins = useSelector(adminCount);
    // console.log(totalUsers, totalAdmins)
    const { loading, result } = useSelector((state) => ({ ...state.users }));

    const userPerPage = 3;
    // console.log('Current Page', currPage)
    // console.log(totalUsers, totalAdmins)

    useEffect(() => {
        if (userType === 'admins') {
            setTotalPage(Math.ceil(totalAdmins / userPerPage));

            dispatch(getUsersAsync({ currPage, userPerPage, userType }));
        }
        else {
            dispatch(getUsersAsync({ currPage, userPerPage, userType }));
            setTotalPage(Math.ceil(totalUsers / userPerPage))
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
                        <ModalShow title={'ManageUsers'} />
                        <DashboardHeader
                            title='User Management'
                            setFilerType={setUserType}
                            filterType={userType}
                            filterTitle='users'
                            value={[
                                { value: 'allUsers', label: 'All Users' },
                                { value: 'admins', label: 'Admins' },
                            ]}
                        />

                        <div className=' mt-5 hidden lg:block'>
                            <Table data={result?.users} />
                        </div>
                        <div className='lg:hidden grid grid-cols-1 md:grid-cols-2 mt-5 rounded-md gap-4'>
                            {
                                result?.users?.map((user, index) => <Card key={index} data={user} />)
                            }
                        </div>
                        <Pagination
                            currPage={currPage}
                            totalPage={totalPage}
                            setCurrPage={setCurrPage}
                        // setAdminCurrPage={setAdminCurrPage}
                        />
                    </div>
            }
        </>
    );
};

export default ManageUsers;