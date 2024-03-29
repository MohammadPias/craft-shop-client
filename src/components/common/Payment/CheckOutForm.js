import React, { useEffect, useState } from 'react';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { logEvent, Result, ErrorResult } from './util';
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../../Api/ProductApi';
import { setPayment } from '../../../features/cartSlice/cartSlice';
import { updatePayment } from '../../../features/ordersSlice/orderSlice';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({ cartEstimate, order }) => {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [postal, setPostal] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate()

    const dispatch = useDispatch()
    // const cartEstimate = useSelector(state => state.cart?.cartEstimate)
    const user = useSelector(state => state.user?.result)


    useEffect(() => {
        // console.log(typeof (cartEstimate?.total))
        instance.post('payment/create-payment-intent', { amount: cartEstimate?.total })
            .then(res => setClientSecret(res.data?.clientSecret))
            .catch(error => console.log(error))
    }, [user, cartEstimate])


    const ELEMENT_OPTIONS = {
        style: {
            base: {
                fontSize: '18px',
                color: '#424770',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardNumberElement);

        if (card == null) {
            return;
        }
        setProcessing(true)
        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: user?.displayName,
                email: user?.email,
                address: {
                    postal_code: postal,
                },
            },

        });

        if (payload.error) {
            console.log('[error]', payload.error);
            setErrorMessage(payload.error.message);
            setPaymentMethod(null);
        } else {
            console.log('[PaymentMethod]', payload.paymentMethod);
            setPaymentMethod(payload.paymentMethod);
            setErrorMessage(null);
        }
        // payment instance
        const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            },
        );
        if (error) {
            setErrorMessage(error.message)
            setPaymentMethod(null);
            setSuccess(null)
        }
        else {
            console.log('payment intent', paymentIntent)
            // setPaymentMethod(paymentIntent);
            setErrorMessage(null);
            setProcessing(false);
            setSuccess('Your payment processed successfully');
            const date = new Date().toLocaleDateString;
            const payment = {
                orderId: order?._id,
                amount: paymentIntent.amount,
                id: paymentIntent.id,
                date: date,
            }

            if (order?._id) {

                instance.put('/orders/updatePayment', {
                    payment
                }).then(res => {
                    console.log(res.data)
                    if (res?.data?.modifiedCount > 0) {
                        navigate(-1)
                    }
                })
            }
            dispatch(setPayment(payment))
            dispatch(updatePayment(payment))
        }
    };
    // console.log(paymentMethod)

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-3">
                <label
                    htmlFor="name">Full Name</label>
                <br />
                <input
                    className='h-12 border border-gray-300 w-full focus:outline outline-gray-300 mt-2'
                    id="name"
                    disabled
                    defaultValue={user?.displayName}
                    value={user?.displayName}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="cardNumber">Card Number</label>
                <CardNumberElement
                    className='h-12 border border-gray-300 w-full focus:outline outline-gray-300 mt-2'
                    id="cardNumber"
                    onBlur={logEvent('blur')}
                    onChange={logEvent('change')}
                    onFocus={logEvent('focus')}
                    onReady={logEvent('ready')}
                    options={ELEMENT_OPTIONS}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="expiry">Card Expiration</label>
                <CardExpiryElement
                    className='h-12 border border-gray-300 w-full focus:outline outline-gray-300 mt-2'
                    id="expiry"
                    onBlur={logEvent('blur')}
                    onChange={logEvent('change')}
                    onFocus={logEvent('focus')}
                    onReady={logEvent('ready')}
                    options={ELEMENT_OPTIONS}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="cvc">CVC</label>
                <CardCvcElement
                    className='h-12 border border-gray-300 w-full focus:outline outline-gray-300 mt-2'
                    id="cvc"
                    onBlur={logEvent('blur')}
                    onChange={logEvent('change')}
                    onFocus={logEvent('focus')}
                    onReady={logEvent('ready')}
                    options={ELEMENT_OPTIONS}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="postal">Postal Code</label>
                <input
                    className='h-12 border border-gray-300 w-full focus:outline outline-gray-300 mt-2'
                    id="postal"
                    required
                    placeholder="12345"
                    value={postal}
                    onChange={(e) => {
                        setPostal(e.target.value);
                    }}
                />
            </div>

            {errorMessage &&
                <div className='w-full mt-3 bg-red-100 text-red-800 text-center p-3'>
                    <h1 className='text-md font-medium'>
                        <ErrorResult>{errorMessage}</ErrorResult>
                    </h1>
                </div>
            }
            {success &&
                <div className='w-full mt-3 bg-green-100 text-green-800 text-center p-3'>
                    <h1 className='text-md font-medium'>
                        <Result>{success}</Result>
                    </h1>
                </div>
            }
            {
                processing ? 'processing...' :
                    <button className='btn btn-primary w-full h-12 mt-3' type="submit" disabled={!stripe || success}>
                        Pay ${cartEstimate?.total}
                    </button>
            }
        </form>
    );
};

export default CheckOutForm;