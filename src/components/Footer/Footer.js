import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'

const Footer = () => {
    return (
        <div className='bg-secondary min-h-min pt-10'>
            <div className='container'>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className='sm:col-span-3 sm:justify-self-center'>
                        <img className='w-40 mx-auto' src={logo} alt="" />
                        <p className='sm:w-1/2 text-center mx-auto my-3 '>Craft Shop is an online handy craft shop that sells artistic handy craft products of different catagories.</p>
                        <div className="social-icons flex gap-5 justify-center flex-shrink-0">
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i className="fa-brands fa-facebook-f "></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i class="fa-brands fa-twitter"></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i class="fa-brands fa-instagram"></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i class="fa-brands fa-dribbble"></i>
                                </Link>
                            </div>
                            <div className="flex items-center justify-center social-icon">
                                <Link to='#'>
                                    <i class="fa-brands fa-linkedin-in"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <h1 className="text-sm text-center py-3 border-t border-gray-300">
                All Right Reserved &copy; Craft Shop
            </h1>
        </div>
    );
};

export default Footer;