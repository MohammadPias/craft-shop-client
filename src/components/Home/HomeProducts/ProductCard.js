import React from 'react';

const ProductCard = ({ product }) => {
    const { title, img, rating, price } = product;
    return (
        <div className='card-container bg-secondary rounded-md p-3 border border-gray-200'>
            <div className=''>
                <img className='w-full rounded-md' src={img} alt="" />
            </div>
            <div className=''>
                <h1 className='text-lg font-bold mt-2'>{title}</h1>
                <h1 className='text-xl font-bold mt-2'>Price: ${price}</h1>
            </div>
        </div>
    );
};

export default ProductCard;