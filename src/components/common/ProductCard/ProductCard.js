import React from 'react';
import ReactRating from '../ReactRating/ReactRating';

const ProductCard = ({ product }) => {
    const { title, img, rating, price } = product;
    let ratingCount = 0;
    if (rating.length > 0) {
        for (const rate of rating) {
            ratingCount = ratingCount + rate;
        }
    }
    return (
        <div className='card-container  rounded-md p-3 border border-gray-200'>
            <div className='h-52 group relative'>
                <img className='w-full h-full pb-12 rounded-md object-contain transform group-hover:scale-105 transition-all duration-500' src={img} alt="" />
                <div className='h-10 w-full absolute bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex justify-center space-x-3'>
                    <div className="h-10 w-10 bg-secondary rounded-full shadow-md flex justify-center items-center text-gray-500">
                        <i class="fa-solid fa-eye"></i>
                    </div>
                    <div className="h-10 w-10 bg-secondary rounded-full shadow-md flex justify-center items-center text-gray-500">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div className="h-10 w-10 bg-secondary rounded-full shadow-md flex justify-center items-center text-gray-500">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <h1 className='text-md font-medium '>{title}</h1>
                <h1 className='text-xl font-bold '>Price: ${price}</h1>
                <h1 className='text-sm font-medium '>
                    Rating: <ReactRating
                        change={true}
                        rating={ratingCount / rating?.length}
                    /> ({rating?.length})
                </h1>
            </div>
        </div>
    );
};

export default ProductCard;