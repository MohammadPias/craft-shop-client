import React from 'react';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div className='min-h-screen sm:mt-14'>
            <Banner />
            <h3 className="text-3xl">This is home page</h3>
        </div>
    );
};

export default Home;