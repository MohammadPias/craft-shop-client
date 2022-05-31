import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import {
    Elements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const StripePayment = () => {
    return (
        <div className='border border-gray-200 p-5 rounded-md'>
            <h1 className="text-md font-bold text-gray-500 text-center">Make Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        </div>
    );
};

export default StripePayment;