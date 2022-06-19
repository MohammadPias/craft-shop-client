import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import About from './About/About';
import Banner from './Banner/Banner';
import Contact from './Contact/Contact';
import HomeProducts from './HomeProducts/HomeProducts';
import LatestProducts from './LatestProducts/LatestProducts';

const Home = () => {
    return (
        <>
            <Header />
            <div className='min-h-screen sm:mt-14'>
                <Banner />
                <HomeProducts />
                <About />
                <LatestProducts />
                <Contact />
            </div>
            <Footer />
        </>
    );
};

export default Home;