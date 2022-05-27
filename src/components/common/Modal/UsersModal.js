import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { loginSuccess, setRole } from '../../../features/user/userSlice';

const UsersModal = ({ value }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            displayName: '',
            email: value?.email,
            role: '',
        }
    });
    const onSubmit = data => {
        const email = data.email;
        const role = data.role;
        const displayName = data.displayName;
        const user = {
            displayName: displayName,
            email: email,
            role: role,
        }
        if (email && role) {
            instance.put('/users', { email, role, displayName })
                .then(res => {
                    toast.success('User role is added successfully')
                    reset();
                    dispatch(setRole(role));
                    dispatch(loginSuccess(user))
                })
                .catch((error) => {
                    toast.error('Something went wrong')
                })
        }
        else {
            alert('Please enter email and role')
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md'>
            <h5 className='text-center font-bold text-lg text-gray-500 mt-3'>
                {value?.displayName ? 'Update User' : 'Add Admin'}
            </h5>
            {
                value?.displayName &&
                <Controller
                    name="displayName"
                    control={control}
                    render={({ field }) => <input className="w-full border border-gray-300 focus:outline-none text-center mt-3 p-1 text-gray-600" placeholder='name' {...field} />}
                />
            }
            <br />
            <Controller
                defaultValue={value?.email}
                name="email"
                control={control}
                render={({ field }) => <input className="w-full border border-gray-300 focus:outline-none text-center mt-3 p-1 text-gray-600" placeholder='email' {...field} />}
            />
            <br />
            <Controller
                name="role"
                control={control}
                defaultValue={value?.role ? value?.role : ''}
                render={({ field }) => <select
                    className="w-full border border-gray-300 focus:outline-none text-center mt-3 p-1 text-gray-500"
                    {...field}
                    placeholder='select'
                >
                    <option value="" disabled hidden>set role</option>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                </select>

                }
            />
            <br />
            <button type='submit' className='btn btn-primary w-full mt-3 p-1 hover:bg-tertiary transition duration-150'>Add</button>
        </form>
    );
};

export default UsersModal;