import React from 'react';
import Banner from './Banner/Banner';
import HomeProducts from './HomeProducts/HomeProducts';

const Home = () => {
    return (
        <div className='min-h-screen sm:mt-14'>
            <Banner />
            <HomeProducts />
        </div>
    );
};

export default Home;