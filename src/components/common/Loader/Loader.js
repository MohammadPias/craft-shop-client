import React from 'react';
import { HashLoader } from 'react-spinners';

const LoaderComponent = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <HashLoader color='#c5986b' loading />
        </div>
    );
};

export default LoaderComponent;