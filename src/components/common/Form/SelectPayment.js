import React, { useState } from 'react';
import visa from '../../../images/visa.png'
import mcard from '../../../images/mastercard.png'
import paypal from '../../../images/paypal.png'
import bkash from '../../../images/bkash.png'
import cashon from '../../../images/cashon.png'

const SelectPayment = ({ formData, setFormData }) => {
    const [check, setCheck] = useState(false)

    const handleCheck = (e) => {
        const { checked, name } = e.target;
        console.log(checked, name)
        if (checked) {
            setCheck(name)
            setFormData({ ...formData, paymentType: name })
        }
        else {
            setCheck('')
            setFormData({ ...formData, paymentType: '' })
        }
    }

    // console.log(check)
    const PaymentRow = ({ image, title, type }) => {
        return (
            <label htmlFor={type}>
                <div className={`flex justify-between items-center border border-gray-200 px-5 shadow-sm mt-3 text-gray-600 py-1 rounded-md ${check === type && 'bg-secondary-deep  '}`}>
                    <div className='flex space-x-8 items-center'>
                        <img className='h-14 w-14 object-contain' src={image} alt="" />
                        <h1 className="text-md font-bold">{title}</h1>
                    </div>
                    <input
                        onChange={(e) => handleCheck(e)}
                        // value={formData.paymentType}
                        required
                        checked={check === type ? true : false}
                        name={type}
                        id={type}
                        className='h-4 w-4'
                        type="checkbox" />
                </div>
            </label>
        )
    }
    return (
        <div className=''>
            <PaymentRow image={visa} title='Visa' type='visa' />
            <PaymentRow image={mcard} title='Master Card' type='masterCard' />
            <PaymentRow image={paypal} title='Paypal' type='paypal' />
            <PaymentRow image={bkash} title='B-kash' type='bKash' />
            <PaymentRow image={cashon} title='Cash on Delivery' type='cashOnDelivery' />
        </div>
    );
};

export default SelectPayment;