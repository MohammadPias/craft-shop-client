import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCartAccount } from '../../features/cartSlice/cartSlice';

const CartRow = ({ title, value }) => {

    return (
        <div className='h-14 px-3 flex justify-between items-center text-gray-600 border-b border-b-gray-200'>
            <h1 className="text-md font-bold">{title} :</h1>
            <h1 className="text-md font-bold">{value}</h1>
        </div>
    )
}

const CartAccount = ({ disable }) => {
    const [discount, setDiscount] = useState('');
    const { totalPrice, totalProduct } = useSelector(state => ({ ...state.cart }))
    const [couponValidity, setCouponValidity] = useState(false);
    const [amount, setAmount] = useState(0);
    // const [estimate, setEstimate] = useState({})

    const dispatch = useDispatch()

    const shipping = totalPrice > 500 ? 50 : 0;
    const tax = (totalPrice + shipping) * 10 / 100;
    let netAmount = totalPrice + shipping + tax;


    useEffect(() => {
        const shipping = totalPrice > 500 ? 50 : 0;
        const tax = (totalPrice + shipping) * 10 / 100;
        let netAmount = totalPrice + shipping + tax;
        setAmount(netAmount)
        // setEstimate(cartEstimate)
    }, [totalPrice, amount, totalProduct])

    const makeDiscount = (amount) => {
        const coupon = process.env.REACT_APP_COUPON;
        if (amount === coupon) {
            setAmount(netAmount - netAmount * 10 / 100)
            toast.success('Congratulations! You have got 10% discount.')
            setCouponValidity(true)
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        makeDiscount(e.target.coupon.value)
    }

    const cartEstimate = {
        price: totalPrice,
        items: totalProduct,
        shipping: shipping,
        tax: tax,
        total: amount

    }
    return (
        <div className='w-full border border-gray-200 p-5'>
            <div className='h-14 bg-gray-100 flex justify-center items-center text-gray-600'>
                <h1 className="text-md font-bold">Cart Estimate</h1>
            </div>
            <CartRow title='Items' value={totalProduct} />
            <CartRow title='Price' value={`$ ${totalPrice}`} />
            <CartRow title='Shipping' value={`$ ${shipping}`} />
            <CartRow title='Tax' value={`$ ${tax}`} />
            <CartRow title='Total' value={`$ ${amount}`} />

            {
                !disable &&
                <div>
                    <form
                        onSubmit={(e) => {
                            handleOnSubmit(e)
                        }}
                        className='h-14 flex justify-between items-center text-gray-600 border-b border-b-gray-200'>
                        <input
                            onChange={(e) => setDiscount(e.target.value)}
                            value={discount}
                            placeholder='Coupon'
                            name='coupon'
                            className='h-8 focus:outline-gray-300 border border-gray-200 text-center' type="text" />
                        <button disabled={couponValidity && true} type='submit' className={`h-8 btn btn-primary ${couponValidity && 'opacity-50'}`}>Apply</button>
                    </form>
                    <Link to='checkout'>
                        <button
                            onClick={() => dispatch(setCartAccount(cartEstimate))}
                            className='h-12 btn btn-primary w-full'>Proceed to Checkout</button>
                    </Link>
                </div>
            }

        </div>
    );
};

export default CartAccount;