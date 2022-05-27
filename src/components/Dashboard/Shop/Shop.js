import React, { useState } from 'react';
import Pagination from '../../common/Pagination/Pagination';
import DashboardHeader from '../DashboardHeader';

const Shop = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [filterType, setFilerType] = useState('');

    return (
        <div>
            <DashboardHeader
                title='Shop'
                setFilerType={setFilerType}
                filterType={filterType}
                filterTitle='category'
                value={[
                    { value: 'basket', label: 'Basket' },
                    { value: 'footwear', label: 'Foot Wear' },
                ]}
            />
            <Pagination
                currPage={currPage}
                totalPage={totalPage}
                setCurrPage={setCurrPage}
            // setAdminCurrPage={setAdminCurrPage}
            />
        </div>
    );
};

export default Shop;