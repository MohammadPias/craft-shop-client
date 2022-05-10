import React, { useState } from 'react';
import logo from '../../images/logo-ver.svg'

const TopNav = () => {
    const [open, setOpen] = useState(false);
    console.log(open)
    return (
        <div className='border border-b-gray-300'>
            <div className="grid grid-cols-2 items-center sm:grid-cols-3 gap-8 sm:w-4/5 mx-auto p-5">
                <div className="logo col-span-2 sm:col-span-1 sm:order-2 flex justify-center">
                    <img className='w-2/5' src={logo} alt="" />
                </div>
                <div className="relative sm:order-1">
                    <input className=' rounded-full p-2 outline-none text-center  border border-gray-200' type="search" name="" id="" />
                    <button className='absolute left-2 top-1.5 bg-primary h-7 w-7 rounded-full p-1 text-white'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className=" sm:order-3 text-2xl flex justify-end text-gray-600">
                    <i className="fa-solid fa-user mr-7 cursor-pointer"></i>
                    <div className='relative'>
                        <i className="fa-solid fa-bag-shopping cursor-pointer"></i>
                        <div className="w-6 h-6 bg-primary rounded-full text-xs font-bold p-1 text-white absolute -top-2 -right-4">
                            10
                        </div>
                    </div>
                </div>

            </div>
            <div className='relative bg-secondary sm:bg-transparent p-2 flex justify-center'>
                <div className='sm:hidden'>
                    {
                        open ? <button onClick={() => setOpen(false)} className='h-full'>
                            <i className="fa-solid fa-xmark border border-gray-600 p-2 rounded-md"></i>
                        </button>
                            :
                            <button onClick={() => setOpen(true)} className='h-full'>
                                <i className="fa-solid fa-bars border border-gray-600 p-2 rounded-md"></i>
                            </button>

                    }
                </div>
                <ul className={` text-center text-md font-bold text-gray-600 p-4 absolute top-full ${open ? 'left-0' : '-left-full sm:left-0'} z-10 w-full transition-all duration-1000 sm:flex sm:justify-center border-b border-gray-300 bg-secondary`}>
                    <li className='mt-3 sm:mt-1 px-5'>Home</li>
                    <li className='mt-3 sm:mt-1 px-5'>Shop</li>
                    <li className='mt-3 sm:mt-1 px-5'>About Us</li>
                    <li className='mt-3 sm:mt-1 px-5'>Contact Us</li>
                </ul>


            </div>
        </div>
    );
};

export default TopNav;