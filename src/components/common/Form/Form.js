import React, { useState } from 'react';
import Register from '../../Register/Register';
import ShippingForm from './ShippingForm';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CartAccount from '../../CartAccount/CartAccount';
import SelectPayment from './SelectPayment';

const Form = () => {
    const [page, setPage] = useState(0)
    const pageTitle = ['Sign up', 'Shipping Address', 'Select a payment method'];
    const user = useSelector(state => state.user.result)




    const [formData, setFormData] = useState({
        name: user?.displayName,
        email: user?.email,
        phone: '',
        shippingType: '',
        country: '',
        state: '',
        address: '',
        paymentType: '',
    })
    console.log(formData)
    const pageComponents = () => {


        if (page === 0) {
            return <div className='w-full'>
                {
                    user?.email &&
                    <h1 className="text-lg font-medium text-center">You are signed in Next to Continue..</h1>
                }
            </div>
        }
        else if (page === 1) {
            return <ShippingForm formData={formData} setFormData={setFormData} />
        }
        else {
            return <SelectPayment formData={formData} setFormData={setFormData} />
        }
    }
    return (
        <>
            <Header />
            <div className='lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div className='p-3 lg:order-2'>
                    <CartAccount disable={true} />
                </div>
                <div className='lg:container lg:col-span-2 lg:order-1'>
                    <div className='w-full p-3'>
                        <div className='bg-secondary-deep w-full h-8 rounded-full'>
                            <div className={`bg-primary h-8 rounded-full ${page === 0 ? 'w-1/3' : page === 1 ? 'w-2/3' : 'w-full'}`}></div>
                        </div>
                        <div className='border border-gray-200 shadow-sm p-5 mt-5 rounded-lg'>
                            <div className='text-xl font-bold text-center text-gray-500'>{pageTitle[page]}</div>
                            <div className='w-full mt-5'>
                                {pageComponents()}
                            </div>
                            <div className='flex justify-between mt-5'>
                                <button
                                    disabled={page === 0 && true}
                                    onClick={() => { setPage(currPage => currPage - 1) }}
                                    className='btn btn-primary h-12'>Prev</button>
                                <button
                                    onClick={() => {
                                        if (page < 2) {
                                            setPage(currPage => currPage + 1)
                                        }
                                    }}
                                    className='btn btn-primary h-12'>{page === 2 ? 'Submit' : 'Next'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Form;