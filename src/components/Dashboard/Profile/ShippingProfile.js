import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';

const ShippingProfile = ({ shipping }) => {
    const user = useSelector(state => state?.user?.result);
    // const [shipping, setShipping] = useState({});
    const { name, phone, country, email, shippingType, state, address } = shipping
    const [formData, setFormData] = useState({
        name: name,
        phone: phone,
        country: country,
        email: email,
        shippingType: shippingType,
        state: state,
        address: address,
    });

    // console.log(formData.phone)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        instance.put(`/users/update?email=${user?.email}`, formData)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    toast.success('Shipping added successfully.')
                }
            })
    }

    // console.log(shipping, formData)
    return (
        <div>
            <form onSubmit={handleOnSubmit} className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className='w-full'>
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })}
                        defaultValue={formData?.name}
                        placeholder='Name'
                        name='name'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 rounded-md'
                    />
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })}
                        defaultValue={formData?.phone}
                        placeholder='Phone'
                        name='phone'
                        type="number"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 mt-5 rounded-md'
                    />
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })}
                        defaultValue={formData?.country}
                        placeholder='Country'
                        name='country'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 mt-5 rounded-md'
                    />
                </div>
                <div>
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })}
                        defaultValue={formData?.email}
                        placeholder='Email'
                        name='email'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 rounded-md'
                    />
                    <Select
                        required
                        onChange={(selectedOption) => setFormData({ ...formData, shippingType: selectedOption.value })}
                        value={formData?.shippingType}
                        name='shippingType'
                        className='w-full text-center text-gray-500 mt-5'
                        options={[
                            { value: 'curiar', label: 'Sundorbon Couriar' },
                            { value: 'saParibahan', label: 'SA Paribahan' },
                        ]}
                    />
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })}
                        defaultValue={formData?.state}
                        placeholder='State'
                        name='state'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 mt-8 rounded-md'
                    />
                </div>
                <div className='lg:col-span-2'>
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })}
                        defaultValue={formData?.address}
                        placeholder='Address'
                        name='address'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 rounded-md'
                    />
                </div>
                <div className='lg:col-span-2 mx-auto'>
                    <button className='btn btn-primary py-2'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default ShippingProfile;