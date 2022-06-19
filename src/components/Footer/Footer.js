import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'

const Footer = () => {
    return (
        <div className='bg-secondary min-h-min pt-10 mt-10'>
            <div className='container'>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div className='lg:order-2 py-3'>
                        <img className='w-40 mx-auto' src={logo} alt="" />
                        <p className='text-center mx-auto my-3 text-gray-500'>Craft Shop is an online handy craft shop that sells artistic handy craft products of different catagories.</p>
                        <div className="social-icons flex gap-5 justify-center flex-shrink-0">
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i className="fa-brands fa-facebook-f "></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i className="fa-brands fa-instagram"></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i className="fa-brands fa-dribbble"></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='lg:order-1 py-3'>
                        <div className="text-gray-500">
                            <h6 className='font-bold'>Address</h6>
                            <div className='flex items-center mt-5 space-x-3 font-medium'>
                                <i className="fa-solid fa-location-dot"></i>
                                <small>504/3, Fatema Villa, 3rd floor, Uttara, Dahaka</small>
                            </div>
                            <div className='flex items-center mt-3 space-x-3 font-medium'>
                                <i className="fa-solid fa-phone"></i>
                                <small>+8801300000000</small>
                            </div>
                            <div className='flex items-center mt-3 space-x-3 font-medium'>
                                <i className="fa-solid fa-tty"></i>
                                <small>+8800001111</small>
                            </div>
                            <div className='flex items-center mt-3 space-x-3 font-medium'>
                                <i className="fa-solid fa-envelope"></i>
                                <small>craft-shop@gmail.com</small>
                            </div>
                        </div >
                    </div>
                    <div className='lg:order-3 text-gray-500 lg:text-right py-3'>
                        <h4 className='font-bold'>Categories</h4>
                        <Link to='' className='flex space-x-3 items-center mt-5 lg:justify-end'>
                            <small className='font-medium'>Footwear</small>
                            <i className="fa-solid fa-angle-right"></i>
                        </Link>
                        <Link to='' className='flex space-x-3 items-center mt-3 lg:justify-end'>
                            <small className='font-medium'>Bamboo Craft</small>
                            <i className="fa-solid fa-angle-right"></i>
                        </Link>
                        <Link to='' className='flex space-x-3 items-center mt-3 lg:justify-end'>
                            <small className='font-medium'>Ceramic Craft</small>
                            <i className="fa-solid fa-angle-right"></i>
                        </Link>
                        <Link to='' className='flex space-x-3 items-center mt-3 lg:justify-end'>
                            <small className='font-medium'>Wood Craft</small>
                            <i className="fa-solid fa-angle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <h1 className="text-sm text-center py-3 border-t border-gray-200 text-gray-400">
                All Right Reserved &copy; Craft Shop
            </h1>
        </div>
    );
};

export default Footer;