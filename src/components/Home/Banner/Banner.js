import React from 'react';
import Slider from "react-slick";
import slide from '../../../images/banner.jpg'
import slide2 from '../../../images/banner2.jpg'
import slide3 from '../../../images/banner3.jpg'

import './Banner.css'

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    return (
        <div className=''>
            <Slider {...settings}>
                <div>
                    <img className='w-full' src={slide} alt="" />
                </div>
                <div>
                    <img className='w-full' src={slide2} alt="" />
                </div>
                <div>
                    <img className='w-full' src={slide3} alt="" />
                </div>
            </Slider>
        </div>
    );
};

export default Banner;