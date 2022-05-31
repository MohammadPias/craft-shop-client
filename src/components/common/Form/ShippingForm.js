import React from 'react';
import Select from 'react-select';

const ShippingForm = ({ formData, setFormData }) => {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className='w-full'>
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                        // placeholder='Name'
                        name='name'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 rounded-md'
                    />
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })}
                        value={formData.phone}
                        placeholder='Phone'
                        name='phone'
                        type="number"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 mt-5 rounded-md'
                    />
                    <input
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })}
                        value={formData.country}
                        placeholder='Country'
                        name='country'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 mt-5 rounded-md'
                    />
                </div>
                <div>
                    <input
                        required
                        readOnly
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })}
                        value={formData.email}
                        placeholder='Email'
                        name='email'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 rounded-md'
                    />
                    <Select
                        required
                        onChange={(selectedOption) => setFormData({ ...formData, shippingType: selectedOption.value })}
                        defaultValue={formData.shippingType}
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
                        value={formData.state}
                        placeholder='State'
                        name='state'
                        type="text"
                        className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 mt-8 rounded-md'
                    />
                </div>
            </div>
            <input
                required
                onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })}
                value={formData.address}
                placeholder='Address'
                name='address'
                type="text"
                className='w-full border border-gray-300 focus:outline-gray-300 h-12 text-center text-gray-500 mt-5 rounded-md'
            />
        </div>
    );
};

export default ShippingForm;