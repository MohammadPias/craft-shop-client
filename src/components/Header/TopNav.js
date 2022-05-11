import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                    <input className=' rounded-full p-2 outline-none text-center  border border-gray-200 shadow-sm' type="search" name="" id="" />
                    <button className='absolute left-2 top-1.5 bg-primary h-7 w-7 rounded-full p-1 text-white'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className=" sm:order-3 text-2xl flex justify-end text-gray-600">
                    <div className='relative group'>
                        <i className="fa-solid fa-user mr-7 cursor-pointer"></i>
                        <div className='flex flex-col text-lg font-medium bg-secondary p-4 rounded-md absolute top-full right-1/2 z-20 invisible shadow-md group-hover:visible'>
                            <Link to='/login' className='hover:text-gray-400 border-b border-gray-300 p-2'>Login</Link>
                            <Link to='/register' className='hover:text-gray-400 border-b border-gray-300 p-2'>Register</Link>
                            <Link to='/profile' className='hover:text-gray-400 border-b border-gray-300 p-2'>Profile</Link>
                            <Link to='/dashboard' className='hover:text-gray-400 border-b border-gray-300 p-2'>Dashboard</Link>
                            <button className="btn btn-primary hover:bg-tertiary transition duration-150">Log out</button>
                        </div>
                    </div>
                    <div className='relative'>
                        <Link to='/cart'>
                            <i className="fa-solid fa-bag-shopping cursor-pointer"></i>
                        </Link>
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
                <ul className={` text-center text-md font-medium text-gray-600 p-4 absolute top-full ${open ? 'left-0' : '-left-full sm:left-0'} z-10 w-full transition-all duration-1000 sm:flex sm:justify-center border-b border-gray-300 bg-secondary`}>
                    <li className='mt-3 sm:mt-1 px-5  hover:text-gray-400'><Link to='/' className='focus:font-bold focus:text-gray-800'>Home</Link></li>
                    <li className='mt-3 sm:mt-1 px-5  hover:text-gray-400'><Link to='/shop' className='focus:font-bold focus:text-gray-800'>Shop</Link></li>
                    <li className='mt-3 sm:mt-1 px-5 hover:text-gray-400'><Link to='/about' className='focus:font-bold focus:text-gray-800'>About Us</Link></li>
                    <li className='mt-3 sm:mt-1 px-5  hover:text-gray-400'><Link to='/contact' className='focus:font-bold focus:text-gray-800'>Contact Us</Link></li>
                </ul>


            </div>
        </div>
    );
};

export default TopNav;