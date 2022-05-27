import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { instance } from '../../Api/ProductApi';
import { modalOpen } from '../../features/mySlice/mySlice';
import userImg from '../../images/user.png'

const Card = ({ data }) => {
    const dispatch = useDispatch();
    const handleEditUser = (user) => {
        const { email } = user;

        dispatch(modalOpen({ email: email }))
    }

    const handleDelete = (id, uid) => {
        const confirm = window.confirm('Are you sure you want to delete this user?');
        if (confirm) {
            instance.delete(`/users?id=${id}&&uid=${uid}`)
                .then(res => {
                    console.log(res)
                    toast.success('User Deleted Successfully');
                })
        }

    }

    return (
        <div className='bg-secondary p-5 flex space-x-3 items-center rounded-md shadow'>
            <div className=' h-16 w-16 rounded-full bg-white p-1 ring-2 ring-green-600 relative flex-shrink-0
            '>
                <img className='w-full rounded-full' src={data?.photoURL ? data?.photoURL : userImg} alt="" />
                {
                    data?.role === 'admin' &&
                    <div className='absolute px-2 bg-green-300 rounded-full'>
                        <small>admin</small>
                    </div>
                }
            </div>
            <div className='flex flex-col space-y-1 overflow-auto'>
                <h1 className='text-md font-medium text-gray-700 break-words'>{data?.displayName}</h1>

                <h1 className='text-sm text-gray-500'>{data?.email} </h1>
                <div className='flex justify-between space-x-5'>
                    <span
                        onClick={() => handleDelete(data?._id, data?.uid)}
                        className='bg-red-300 text-red-900 px-2 pb-1 font-medium rounded-full text-sm'
                    >delete</span>
                    <span
                        onClick={() => handleEditUser(data)}
                        className='bg-lime-300 text-lime-900 px-2 pb-1 font-medium rounded-full text-sm'>edit</span>

                </div>
            </div>
        </div>
    );
};

export default Card;