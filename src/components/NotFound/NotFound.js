import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const NotFound = () => {
    return (
        <div>
            <Header />
            <div className='h-screen flex flex-col justify-center items-center'>
                <h1 className="text-9xl 
            text-red-600 
            font-bold ">404</h1>
                <br />
                <h2 className="text-3xl 
            text-red-600 
            font-bold  
            ">
                    Page Not Found
                </h2>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;