import React from 'react';
import { Link } from 'react-router-dom';
import about from '../../../images/about.png'

const About = () => {
    return (
        <div className='lg:container' id='about'>
            <h1 className='heading'>About us</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                <div className='p-5 border border-gray-200 flex justify-center items-center'>
                    <div className=''>
                        <h1 className="text-xl font-bold text-gray-500 text-center">
                            CraftShop
                        </h1>
                        <h3 className='text-center text-md text-gray-400 font-medium mt-5'>We are an online handy craft shop. We supply products over the world. Thousands of crafters sell their products through us.</h3>
                    </div>
                </div>
                <div className='relative group '>
                    <div className='absolute w-full h-full bg-black opacity-0 group-hover:opacity-40 transition duration-700 '></div>
                    <div className=''>
                        <img className='w-full transition-all duration-700' src={about} alt="" />
                    </div>
                    <Link to='shop' className='absolute top-44 left-56 opacity-0 group-hover:opacity-100 transition duration-700'>
                        <button className="btn btn-primary py-3">
                            Discover
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;