import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../Api/ProductApi';
import { clearCart, countCart } from '../../features/cartSlice/cartSlice';
import { getProductAsync } from '../../features/products/productSlice';
import CartAccount from '../CartAccount/CartAccount';
import MiniCard from '../common/MiniCard/MiniCard';
import TableComponent from '../common/Table/TableComponent';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Cart = () => {
    const cart = useSelector(state => state.cart.result)
    const dispatch = useDispatch();
    console.log(cart)
    useEffect(() => {
        dispatch(countCart())
    }, [cart, dispatch])
    const heading = ['Products', 'Price', 'Quantity', 'view', 'Delete']
    const tableData = []
    return (
        <div>
            <Header />
            {
                cart?.length === 0 ?
                    <div className='h-1/2 flex justify-center items-center mt-20'>
                        <div className='w-1/2 bg-red-100 text-center text-red-700 p-5 text-lg font-medium'><h1>Cart is empty!</h1></div>
                    </div>
                    :
                    <div className='h-full lg:mt-16 py-10'>
                        {/* <h1 className="font-bold text-center text-3xl">My Cart</h1> */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-5 lg:px-10 '>
                            <div className='lg:order-2 mx-auto w-full px-5'>
                                <CartAccount
                                    title='Cart Estimate'
                                />
                            </div>
                            <div className="col-span-2 lg:order-1">
                                <div className='hidden lg:block'>
                                    <TableComponent
                                        tableHead={heading}
                                        tableData={cart.length > 0 && cart.map(product => [product.title, product.img, product.price, product.quantity, product._id, product])}
                                    />
                                </div>

                                <div className="lg:hidden p-5">
                                    <MiniCard
                                        data={cart.length > 0 && cart.map(product => [product.title, product.img, product.price, product.quantity, product._id, product])}
                                    />
                                </div>

                                <div className='flex justify-center mt-3'>
                                    <button
                                        onClick={() => {
                                            const proceed = window.confirm('Are you sure you want to delete the cart?')
                                            if (proceed) {
                                                dispatch(clearCart())
                                            }
                                        }}
                                        className="btn btn-primary h-12">Remove Cart</button>
                                </div>
                            </div>
                        </div>

                    </div>
            }
            <Footer />
        </div>
    );
};

export default Cart;