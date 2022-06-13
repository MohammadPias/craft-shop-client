import React from 'react';
import { useSelector } from 'react-redux';
import OrdersChart from '../../common/Chart/OrdersChart';
import SummaryChart from '../../common/Chart/SummaryChart';
import UserChart from '../../common/Chart/UserChart';

const DashboardHome = () => {
    const user = useSelector(state => state.user?.result);
    const { deliveredOrders, totalOrders } = useSelector(state => state?.orders?.myOrders)
    // console.log(totalOrders, deliveredOrders)
    const Card = ({ title, color, value, amount, type }) => {
        // console.log(amount)
        // console.log(user?.role)
        return (
            <div>
                {
                    user?.role === type &&
                    <div className={`${color} p-5 text-gray-700 rounded-lg `}>
                        <div className="">
                            <h1 className="text-lg font-bold text-center">
                                {title}
                            </h1>
                        </div>
                        <div>
                            <h2 className="text-2xl font-medium text-center text">{amount && '$'} {value} <span className='text-sm'></span></h2>
                        </div>

                    </div>
                }
            </div>
        )
    }
    return (
        <div>
            <div className="grid grid-cols- lg:grid-cols-4 gap-5 text-gray-500">
                <Card
                    title='New Orders'
                    color='bg-blue-100'
                    value='150'
                    type='admin'
                />
                <Card
                    title='Delivered'
                    color='bg-lime-100'
                    value='75'
                    type='admin'
                />
                <Card
                    title='Pending'
                    color='bg-yellow-100'
                    value='75'
                    type='admin'
                />
                <Card
                    title='Products'
                    color='bg-purple-100'
                    value='5000'
                    type='admin'
                />
                <Card
                    title='Total Cost'
                    color='bg-cyan-100'
                    value='12400'
                    amount='dollar'
                    type='admin'
                />
                <Card
                    title='Total Sale'
                    color='bg-indigo-100'
                    value='18000'
                    amount='dollar'
                    type='admin'
                />
                <Card
                    title='Revenue'
                    color='bg-red-100'
                    value='5600'
                    amount='dollar'
                    type='admin'
                />
                <Card
                    title='New Users'
                    color='bg-green-100'
                    value='170'
                    type='admin'
                />
                <Card
                    title='Current Orders'
                    color='bg-green-100'
                    value={totalOrders}
                    type='user'
                />
                <Card
                    title='Completed Orders'
                    color='bg-red-100'
                    value={deliveredOrders}
                    type='user'
                />
            </div>
            {
                user?.role === 'admin' &&
                <div className='grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5'>
                    <div className='col-span-2 bg-gray-50 p-5 shadow-sm rounded-lg'>
                        <div className="flex justify-between items-center border-b border-b-gray-300 mb-3">
                            <h1 className="text-lg font-bold text-gray-500 ">Summary</h1>
                            <input className='text-gray-500 focus:outline-gray-300' type="date" name="" id="" />
                        </div>
                        <SummaryChart />
                    </div>
                    <div className='grid grid-cols-1 gap-5'>
                        <div className=' bg-gray-50 p-5 shadow-sm rounded-lg'>
                            <div className="flex justify-between items-center border-b border-b-gray-300 mb-3">
                                <h1 className="text-lg font-bold text-gray-500 ">Users</h1>
                                <input className='text-gray-500 focus:outline-gray-300' type="date" name="" id="" />
                            </div>
                            <UserChart />
                        </div>
                        <div className=' bg-gray-50 p-5 shadow-sm rounded-lg'>
                            <div className="flex justify-between items-center border-b border-b-gray-300 mb-3">
                                <h1 className="text-lg font-bold text-gray-500 ">Orders</h1>
                                <input className='text-gray-500 focus:outline-gray-300' type="date" name="" id="" />
                            </div>
                            <OrdersChart />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default DashboardHome;