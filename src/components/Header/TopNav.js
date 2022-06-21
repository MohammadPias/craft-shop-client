import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import logo from '../../images/logo-ver.svg'
import { useDispatch, useSelector } from 'react-redux';
import userImg from '../../images/user.png';
import { searchProductAsync } from '../../features/products/productSlice';
import { HashLink } from 'react-router-hash-link';

const TopNav = () => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const { handleSignOut } = useFirebase();
    const dispatch = useDispatch();
    const productQuantity = useSelector(state => state.cart.totalProduct)
    const user = useSelector(state => state?.user?.result)
    const handleLogOut = () => {
        handleSignOut();
    }
    const handleClick = (e) => {
        // dispatch(searchProductAsync({ search: search }))
    }
    // console.log(search)

    return (
        <div className='border border-b-gray-300'>
            <div className="grid grid-cols-2 items-center sm:grid-cols-3 gap-8 lg:container mx-auto py-5 px-5 lg:px-0">
                <div className="logo col-span-2 sm:col-span-1 sm:order-2 flex justify-center">
                    <img className='w-2/5' src={logo} alt="" />
                </div>
                <div className="relative sm:order-1">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className=' rounded-full p-2 outline-none text-center  border border-gray-300 shadow-sm' type="search" name="" id="" />

                    <button
                        onClick={() => handleClick()}
                        className='absolute left-2 top-1.5 bg-primary h-7 w-7 rounded-full p-1 text-white'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className=" sm:order-3 text-2xl flex justify-end text-gray-600">
                    <div className='relative group'>
                        <i className="fa-solid fa-user mr-7 cursor-pointer"></i>
                        <div className='flex flex-col text-lg font-medium bg-secondary-deep p-4 rounded-md absolute top-full right-1/2 z-20 invisible shadow-md group-hover:visible'>
                            {
                                user?.email &&
                                <div className='flex flex-col text-center items-center justify-between border-b border-gray-300 p-2'>
                                    {user?.photoURL ?
                                        <img className='h-14 w-14 rounded-full' src={user?.photoURL} alt="" />
                                        :
                                        <img className='h-14 w-14 rounded-full' src={userImg} alt="" />
                                    }
                                    <h1>{user?.displayName?.split(' ')[0]}</h1>
                                </div>
                            }
                            {
                                !user?.email &&
                                <Link to='/login' className='hover:text-gray-400 border-b border-gray-300 p-2'>Login</Link>
                            }
                            {
                                !user?.email &&
                                <Link to='/register' className='hover:text-gray-400 border-b border-gray-300 p-2'>Register</Link>
                            }
                            {
                                user?.email &&
                                <Link to='/dashboard/profile' className='hover:text-gray-400 border-b border-gray-300 p-2'>Profile</Link>
                            }
                            {
                                user?.email &&
                                <Link to='/dashboard' className='hover:text-gray-400 border-b border-gray-300 p-2'>Dashboard</Link>
                            }
                            {
                                user?.email &&
                                <button onClick={() => handleLogOut()} className="btn btn-primary hover:bg-tertiary transition duration-150 w-full">LogOut</button>
                            }
                        </div>
                    </div>
                    <div className='relative'>
                        <Link to='/cart'>
                            <i className="fa-solid fa-bag-shopping cursor-pointer"></i>
                        </Link>
                        <div className="w-6 h-6 bg-primary rounded-full text-xs font-bold p-1 text-white absolute -top-2 -right-4 flex justify-center items-center">
                            {productQuantity}
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
                    <li className='mt-3 sm:mt-1 px-5 hover:text-gray-400'><HashLink to='/#about' className='focus:font-bold focus:text-gray-800'>About Us</HashLink></li>
                    <li className='mt-3 sm:mt-1 px-5  hover:text-gray-400'><HashLink to='/#contact' className='focus:font-bold focus:text-gray-800'>Contact Us</HashLink></li>
                </ul>


            </div>
        </div>
    );
};

export default TopNav;