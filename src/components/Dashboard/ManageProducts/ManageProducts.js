import React from 'react';
import ModalShow from '../../common/Modal/Modal';
import DashboardHeader from '../DashboardHeader';
import AllProducts from './AllProducts';

const ManageProducts = () => {
    return (
        <div>
            <ModalShow title={'ManageProducts'} />
            <DashboardHeader
                title='Products Management'
            />
            <AllProducts />
        </div>
    );
};

export default ManageProducts;