import React from 'react';
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import './slideStyle.css';
import LoaderComponent from '../../common/Loader/Loader'
import { Link } from 'react-router-dom';

const LatestProducts = () => {
    const { loading, result } = useSelector(state => ({ ...state.products }))
    // console.log(result)
    var settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };


    return (
        <div className=' bg-secondary mt-5'>
            <div className="heading">New Arrival</div>
            <div className='sm:container p-5'>
                <div className=''>
                    {
                        loading ?
                            <LoaderComponent />
                            :
                            <Slider {...settings}>
                                {
                                    result?.products?.length > 0 &&
                                    [...result?.products].reverse().slice(0, 8).map((item, index) => <Card item={item} key={index} />)
                                }
                            </Slider>
                    }
                </div>
            </div>
        </div>
    );
};

const Card = ({ item }) => {
    return (
        <div className='p-5'>
            <div className='overflow-hidden rounded-lg'>
                <img
                    className='h-32 lg:h-52 w-full object-cover transform hover:scale-105 transition-all duration-700'
                    src={`${item?.image ? `data:image/png;base64, ${item?.image}` : item?.img}`} alt="" />
            </div>
            <Link to={`productDetails/${item?._id}`}>
                <button className='btn btn-primary w-full mt-3 rounded-lg'>Purchase</button>
            </Link>
        </div>
    )
}

export default LatestProducts;