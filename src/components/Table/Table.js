import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { instance } from '../../Api/ProductApi';
import { modalOpen } from '../../features/mySlice/mySlice';
import { deleteSingleUser } from '../../features/users/UsersSlice';
import LoaderComponent from '../common/Loader/Loader';

const Table = () => {
    const dispatch = useDispatch();
    const { loading, result } = useSelector((state) => ({ ...state.users }));

    const [isOnline, set_isOnline] = useState(true);
    let interval = null;

    const InternetErrMessagenger = () => set_isOnline(navigator.onLine === true);

    useEffect(() => {
        const interval = setInterval(InternetErrMessagenger, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);


    const handleActionOnChange = (e, user) => {
        e.preventDefault();
        const { email, _id, uid } = user;
        const value = e.target.value;
        if (value === 'edit') {
            dispatch(modalOpen({ email: email }))
        }
        else {
            const confirm = window.confirm('Are you sure you want to delete this user?');
            if (confirm) {
                instance.delete(`/users?id=${_id}&&uid=${uid}`)
                    .then(res => {
                        dispatch(deleteSingleUser({ email: email }))
                        toast.warn('User Deleted Successfully');
                    })
            }
        }
    }
    return (
        <>
            {
                loading ?
                    <LoaderComponent />
                    :
                    <table className="table-auto w-full">
                        <thead className='bg-secondary border border-gray-300 rounded-md text-sm font-medium h-14 text-gray-700 text-left'>
                            <tr>
                                <th className='p-5'>Serial</th>
                                <th className='p-5'>Name</th>
                                <th className='p-5'>Status</th>
                                <th className='p-5'>Email</th>
                                <th className='p-5'>Role</th>
                                <th className='p-5'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-left text-gray-500'>
                            {
                                result?.users?.length === 0 ?
                                    <div>
                                        <h1 className="text-bold text-2xl text-center">
                                            No Users Found.
                                        </h1>
                                    </div>
                                    :
                                    result?.users?.map((user, index) =>
                                        <tr key={index} className={`border border-gray-200 h-12 ${index % 2 && 'bg-secondary'} p-3`}>
                                            <td className='p-5 whitespace-nowrap'>{index + 1}</td>
                                            <td className='p-5 whitespace-nowrap'>{user?.displayName}</td>
                                            <td className='p-5 whitespace-nowrap'>
                                                {isOnline === true ? "online" : "offline"}
                                            </td>
                                            <td className='p-5 whitespace-nowrap'>{user?.email}</td>
                                            <td className='p-5 whitespace-nowrap'>{user?.role === 'admin' ? 'admin' : 'user'}</td>
                                            <td className='p-5 whitespace-nowrap'>
                                                <select
                                                    onChange={(e) => handleActionOnChange(
                                                        e, user)}
                                                    name="action"
                                                    id="" className='focus:outline-gray-400'>

                                                    <option value="" hidden>action</option>
                                                    <option value="delete">delete</option>
                                                    <option value="edit">edit</option>
                                                </select>
                                            </td>
                                        </tr>

                                    )
                            }
                        </tbody>
                    </table>
            }
        </>
    );
};

export default Table;