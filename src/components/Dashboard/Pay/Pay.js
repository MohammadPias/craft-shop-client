import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../../Api/ProductApi';
import StripePayment from '../../common/Payment/StripePayment';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';

const Pay = () => {
    const [order, setOrder] = useState({});
    const { orderId } = useParams();
    // console.log(order)
    useEffect(() => {
        instance.get(`/orders/findOrder/${orderId}`)
            .then(res => setOrder(res.data))
    }, [orderId])
    return (
        <div>
            <Header />
            <div className='flex justify-center items-center h-screen mt-16 lg:mt-20'>
                <StripePayment cartEstimate={order?.cartEstimate} order={order} />
            </div>
            <Footer />

        </div>
    );
};

export default Pay;