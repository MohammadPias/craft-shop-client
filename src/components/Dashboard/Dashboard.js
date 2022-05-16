import React, { useState } from 'react';
import { menus } from './DashboardMenu';
import favicon from '../../images/favicon.png'
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('Dashboard');
    const user = useSelector(selectUser)
    return (
        <div className='flex'>
            <div className={`side-bar h-screen ${open ? 'w-64' : 'w-16'} duration-500 bg-secondary relative`}>
                <i onClick={() => setOpen(!open)} className={`fa-solid fa-circle-arrow-left text-gray-500 text-2xl absolute top-12 -right-3 cursor-pointer ${!open && 'rotate-180'}`}></i>

                <div className='flex items-center p-3 h-12 mt-3'>
                    <img className='w-8 h-8' src={favicon} alt="" />
                    <span className={`ml-4 text-xl font-medium ${!open && 'hidden'} text-gray-600`}>Craft Shop</span>
                </div>
                <ul className='mt-5'>
                    {
                        menus.map((menu, index) => {
                            return <Link to={menu.path} key={index}>
                                <li
                                    className={`p-3 text-gray-500 z-10 flex items-center gap-3 h-12 hover:bg-secondary-deep cursor-pointer focus:border border-gray-500 ${active === menu.name && 'bg-secondary-deep border-l-4 border-tertiary shadow-sm'}`}
                                    onClick={() => setActive(menu.name)}
                                >
                                    {menu.icon}
                                    <span className={`text-sm font-medium text-center  ${!open && 'hidden'} duration-300`}>{menu.name}</span>
                                </li>
                            </Link>
                        }
                        )
                    }
                </ul>
            </div>
            <div className="w-full h-screen">
                <div className='bg-secondary py-5'>
                    <div className='container text-gray-600 grid grid-cols-1 lg:grid-cols-3 items-center gap-4'>
                        <div className=' lg:order-2'>
                            <h1 className="text-xl text-center font-bold">
                                Admin Dashboard
                            </h1>
                        </div>
                        <div className="relative lg:order-1 mx-auto">
                            <input className=' rounded-full p-2 outline-none text-center  border border-gray-200 shadow-sm overflow-hidden' type="search" name="" id="" />
                            <button className='absolute left-2 top-1.5 bg-primary h-7 w-7 rounded-full p-1 text-white'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        <div className='text-right text-2xl lg:order-3 flex gap-x-8 justify-center lg:justify-end'>
                            <div className='flex gap-x-3'>
                                <h1 className='text-xl font-medium'>{user?.displayName?.split(" ")[0]}</h1>
                                <div className='h-10 w-10'>
                                    <img className='rounded-full' src={user?.photoURL} alt="" />
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
                </div>
                <div className='m-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;