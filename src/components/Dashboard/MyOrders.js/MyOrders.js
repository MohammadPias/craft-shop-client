import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, fetchOrders } from '../../../features/ordersSlice/orderSlice';
import LoaderComponent from '../../common/Loder/Loder';
import OrderDetails from '../../common/MiniCard/OrderDetails';
import Pagination from '../../common/Pagination/Pagination';
import OrdersTable from '../../common/Table/OrdersTable';
import DashboardHeader from '../DashboardHeader';
import OrderCard from './OrderCard';

const MyOrders = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [cardView, setCardView] = useState({});
    const [filterType, setFilerType] = useState();

    const dispatch = useDispatch();
    const { myOrders, loading, error } = useSelector(state => ({ ...state.orders }))
    const { email } = useSelector(state => state.user?.result)
    const orderPerPage = 5;
    const totalOrders = myOrders?.totalOrders;

    // console.log(myOrders)
    useEffect(() => {
        if (filterType === 'delivered') {
            setTotalPage(Math.ceil(totalOrders / orderPerPage))
            dispatch(fetchOrders({ currPage, orderPerPage, email, filterType }))
        }
        else {
            setTotalPage(Math.ceil(totalOrders / orderPerPage))
            dispatch(fetchOrders({ currPage, orderPerPage, email, filterType }))
        }

    }, [dispatch,
        totalOrders,
        currPage,
        orderPerPage,
        email,
        filterType
    ])

    console.log(filterType)
    return (
        <>
            {
                loading ?
                    <LoaderComponent />
                    :
                    <div>
                        <DashboardHeader
                            title='My orders'
                            setFilerType={setFilerType}
                            filterType={filterType}
                            value={[
                                { value: 'delivered', label: 'Delivered' },
                                { value: 'orders', label: 'Orders' },
                            ]}
                            filterTitle='myOrders'
                        />
                        {
                            myOrders?.data?.length === 0 ?
                                <div className='bg-orange-200 p-5 mt-6'>
                                    <h1 className="text-md font-bold text-orange-700 text-center">
                                        You have no orders
                                    </h1>
                                </div>
                                :
                                <div>
                                    <div className='mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5'>

                                        <div id='orderDetails' className={`${cardView?._id ? 'block' : 'hidden'} lg:order-2`}>
                                            <OrderDetails order={cardView} />
                                        </div>
                                        <div className={`${cardView?._id ? 'lg:col-span-2' : 'lg:col-span-3'} lg:order-1`}>
                                            <div className='hidden lg:block'>
                                                <OrdersTable
                                                    tableHead={['Order Id', 'Total Price', 'Payment', 'Status', 'Action', 'View']}
                                                    tableData={myOrders?.data}
                                                    cardView={cardView}
                                                    setCardView={setCardView}
                                                    title='myOrders'
                                                />
                                            </div>
                                            <div className='lg:hidden'>
                                                <OrderCard
                                                    data={myOrders?.data}
                                                    cardView={cardView}
                                                    setCardView={setCardView}
                                                    title='myOrders'
                                                />
                                            </div>
                                            <Pagination
                                                totalPage={totalPage}
                                                setCurrPage={setCurrPage}
                                                currPage={currPage}
                                            />
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </>
    );
};

export default MyOrders;