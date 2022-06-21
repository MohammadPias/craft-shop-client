import React, { useEffect, useState } from 'react';
import ShippingForm from './ShippingForm';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import CartAccount from '../../CartAccount/CartAccount';
import SelectPayment from './SelectPayment';
import StripePayment from '../Payment/StripePayment';
import { clearCart, setShippingDetails } from '../../../features/cartSlice/cartSlice';
import { instance } from '../../../Api/ProductApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [page, setPage] = useState(0)
    const [shipping, setShipping] = useState({})
    const pageTitle = ['Sign up', 'Shipping Address', 'Select a payment method'];
    const user = useSelector(state => state.user.result)
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    const navigate = useNavigate()

    useEffect(() => {
        instance(`/user/find?email=${user?.email}`)
            .then(res => {
                // console.log(res.data)
                setShipping(res?.data?.shipping)
            })
    }, [user?.email])

    console.log(shipping, user)
    const [formData, setFormData] = useState({
        name: user?.displayName,
        email: user?.email,
        phone: shipping?.phone,
        shippingType: '',
        country: '',
        state: '',
        address: '',
        paymentType: '',
    })
    // console.log(formData)
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
            {
                cart?.result?.length < 0 ?
                    <div className='h-1/2 flex justify-center items-center mt-20'>
                        <div className='w-1/2 bg-red-100 text-center text-red-700 p-5 text-lg font-medium'><h1>Cart is empty!</h1></div>
                    </div>
                    :
                    <div className='lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-5'>
                        <div className='p-3 lg:order-2'>
                            {
                                formData.paymentType === 'visa' || formData.paymentType === 'masterCard' ?
                                    <StripePayment cartEstimate={cart?.cartEstimate} />
                                    :
                                    <CartAccount disable={true} />

                            }
                        </div>
                        <div className='lg:container lg:col-span-2 lg:order-1'>
                            <div className='w-full p-3'>
                                <div className='bg-secondary-deep w-full h-8 rounded-full'>
                                    <div className={`bg-primary h-8 rounded-full ${page === 0 ? 'w-1/3' : page === 1 ? 'w-2/3' : 'w-full'}`}></div>
                                </div>
                                <div className='border border-gray-200 shadow-sm p-5 mt-5 rounded-lg'>
                                    <div className='text-xl font-bold text-center text-gray-500'>{pageTitle[page]}</div>
                                    <div className='w-full mt-5 transition-all duration-500'>
                                        {pageComponents()}
                                    </div>
                                    <div className='flex justify-between mt-5'>
                                        <button
                                            disabled={page === 0 && true}
                                            onClick={() => { setPage(currPage => currPage - 1) }}
                                            className='btn btn-primary h-12'>Prev</button>
                                        <button
                                            onClick={() => {
                                                if (page === pageTitle.length - 1) {

                                                    const order = { ...cart, shipping: formData }
                                                    instance.post('/orders', order)

                                                    instance.put(`/user/update?email=${user?.email}`, formData)

                                                    toast.success('Your order has been placed successfully.')

                                                    navigate('/dashboard/myOrders')
                                                    dispatch(clearCart())
                                                }
                                                else {
                                                    setPage(currPage => currPage + 1)
                                                }
                                            }}
                                            className='btn btn-primary h-12'>{page === pageTitle.length - 1 ? 'Place Order' : 'Next'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Footer />
        </>
    );
};

export default Form;