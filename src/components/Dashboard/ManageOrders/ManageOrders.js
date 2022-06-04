import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../../features/ordersSlice/orderSlice';
import LoaderComponent from '../../common/Loder/Loder';
import OrderDetails from '../../common/MiniCard/OrderDetails';
import Pagination from '../../common/Pagination/Pagination';
import OrdersTable from '../../common/Table/OrdersTable';
import DashboardHeader from '../DashboardHeader'
import OrderCard from '../MyOrders.js/OrderCard';

const ManageOrders = () => {

    const [cardView, setCardView] = useState({});
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [filterType, setFilerType] = useState();
    const dispatch = useDispatch();

    const { allOrders, loading, error } = useSelector(state => state.orders);
    const totalOrders = allOrders.totalOrders;
    const updatedOrders = allOrders.updatedOrders;
    const deliveredOrders = allOrders.deliveredOrders;
    const processingOrders = allOrders.processingOrders;
    const orderPerPage = 5;
    // console.log(allOrders)
    useEffect(() => {
        if (filterType === 'updated') {
            setTotalPage(Math.ceil(updatedOrders / orderPerPage))
            dispatch(fetchAllOrders({ currPage, orderPerPage, filterType }))
        }
        else if (filterType === 'processing') {
            setTotalPage(Math.ceil(processingOrders / orderPerPage))
            dispatch(fetchAllOrders({ currPage, orderPerPage, filterType }))

        }
        else if (filterType === 'delivered') {
            setTotalPage(Math.ceil(deliveredOrders / orderPerPage))
            dispatch(fetchAllOrders({ currPage, orderPerPage, filterType }))

        }
        else {
            setTotalPage(Math.ceil(totalOrders / orderPerPage))
            dispatch(fetchAllOrders({ currPage, orderPerPage, filterType }))
        }
    }, [dispatch,
        currPage,
        orderPerPage,
        totalOrders,
        totalPage,
        filterType,
        deliveredOrders,
        processingOrders,
        updatedOrders
    ]);

    console.log(filterType)
    return (
        <>
            {
                loading ?
                    <LoaderComponent />
                    :
                    <div>
                        {
                            allOrders?.data?.length === 0 ?
                                <div className='bg-orange-200 p-5 mt-6'>
                                    <h1 className="text-md font-bold text-orange-700 text-center">
                                        You have no orders
                                    </h1>
                                </div>
                                :
                                <div>
                                    <DashboardHeader
                                        title='Manage Orders'
                                        filterType={filterType}
                                        setFilerType={setFilerType}
                                        filterTitle='orders'
                                        value={[
                                            { value: 'allOrders', label: 'All Orders' },
                                            { value: 'updated', label: 'Updated' },
                                            { value: 'delivered', label: 'Delivered' },
                                            { value: 'processing', label: 'Processing' },
                                        ]}
                                    />
                                    <div className='mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5'>

                                        <div id='orderDetails' className={`${cardView?._id ? 'block' : 'hidden'} lg:order-2`}>
                                            <OrderDetails order={cardView} />
                                        </div>
                                        <div className={`${cardView?._id ? 'lg:col-span-2' : 'lg:col-span-3'} lg:order-1`}>
                                            <div className='hidden lg:block'>
                                                <OrdersTable
                                                    tableHead={['Order Id', 'Total Price', 'Payment', 'Status', 'Action', 'View']}
                                                    tableData={allOrders?.data}
                                                    cardView={cardView}
                                                    setCardView={setCardView}
                                                    title='manageOrders'
                                                />
                                            </div>
                                            <div className='lg:hidden'>
                                                <OrderCard
                                                    data={allOrders?.data}
                                                    cardView={cardView}
                                                    setCardView={setCardView}
                                                    title='manageOrders'
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

export default ManageOrders;