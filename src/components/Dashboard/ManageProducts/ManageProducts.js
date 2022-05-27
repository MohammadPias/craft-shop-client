import React, { useState } from 'react';
import ModalShow from '../../common/Modal/Modal';
import ProductModal from '../../common/Modal/ProductModal';
import DashboardHeader from '../DashboardHeader';

const ManageProducts = () => {
    const [filterType, setFilerType] = useState('');
    return (
        <div>
            <ModalShow title={'ManageProducts'} />
            <DashboardHeader
                title='Products Management'
                setFilerType={setFilerType}
                filterType={filterType}
                filterTitle='products'
                value={[
                    { value: 'addProduct', label: 'Add Product' },
                    { value: 'manageProducts', label: 'Manage Products' },
                ]}
            />
            <ProductModal />
        </div>
    );
};

export default ManageProducts;