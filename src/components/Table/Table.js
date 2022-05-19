import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { instance } from '../../Api/ProductApi';
import ModalShow from '../common/Modal/Modal';

const Table = ({ data, setRefresh }) => {
    let users = data;
    // console.log(users)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [additionValue, setAdditionValue] = useState({});


    const handleActionOnChange = (e, name, email, img, role, _id, uid) => {
        e.preventDefault();
        const value = e.target.value;
        if (value === 'edit') {
            setAdditionValue({
                displayName: name,
                email: email,
                photoURL: img,
                role: role,
            })
            setModalIsOpen(true)
        }
        else {
            const confirm = window.confirm('Are you sure you want to delete this user');
            if (confirm) {
                users = users?.filter(user => user._id !== _id)
                instance.delete(`/users?id=${_id}&&uid=${uid}`)
                    .then(res => {
                        setRefresh(true)
                        console.log(res)
                        toast.success('User Deleted Successfully');
                    })
            }
        }
    }
    return (
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
                    users?.length === 0 ?
                        'Loading...'
                        :
                        data?.map((user, index) =>
                            <tr key={index} className={`border border-gray-200 h-12 ${index % 2 && 'bg-secondary'} p-3`}>
                                <td className='p-5 whitespace-nowrap'>{index + 1}</td>
                                <td className='p-5 whitespace-nowrap'>{user?.displayName}</td>
                                <td className='p-5 whitespace-nowrap'>online
                                </td>
                                <td className='p-5 whitespace-nowrap'>{user?.email}</td>
                                <td className='p-5 whitespace-nowrap'>{user?.role === 'admin' ? 'admin' : 'user'}</td>
                                <td className='p-5 whitespace-nowrap'>
                                    <select
                                        onChange={(e) => handleActionOnChange(
                                            e,
                                            user?.displayName,
                                            user?.email,
                                            user?.photoURL,
                                            user?.role,
                                            user?._id,
                                            user?.uid)}
                                        name="action"
                                        id="" className='focus:outline-gray-400'>

                                        <option value="" hidden>action</option>
                                        <option value="delete">delete</option>
                                        <option value="edit">edit</option>
                                    </select>
                                </td>
                                <ModalShow
                                    modalIsOpen={modalIsOpen}
                                    setModalIsOpen={setModalIsOpen}
                                    additionValue={additionValue}
                                />
                            </tr>

                        )
                }
            </tbody>
        </table>
    );
};

export default Table;