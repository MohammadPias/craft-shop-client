import React from 'react';
import Form from '../common/Form/Form';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Banner from './Banner/Banner';
import HomeProducts from './HomeProducts/HomeProducts';

const Home = () => {
    return (
        <>
            <Header />
            <div className='min-h-screen sm:mt-14'>
                <Banner />
                <HomeProducts />
                {/* <Form /> */}
            </div>
            <Footer />
        </>
    );
};

export default Home;