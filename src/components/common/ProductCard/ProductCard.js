import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { modalOpen } from '../../../features/mySlice/mySlice';
import ModalShow from '../Modal/Modal';
import ReactRating from '../ReactRating/ReactRating';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { title, img, reviews, price, _id, image } = product;

    let totalRating = 0;
    let netRating = 0;

    if (reviews?.length > 0) {
        for (const review of reviews) {
            totalRating += review.rating
        }
        netRating = totalRating / reviews?.length
    }
    return (
        <div className='card-container  rounded-md p-3 border border-gray-200'>
            <ModalShow title={'productDetails'} />
            <div className='h-52 group relative'>
                <img className='w-full h-full pb-12 rounded-md object-contain transform group-hover:scale-105 transition-all duration-500' src={`${image ? `data:image/png;base64, ${image}` : img}`} alt="" />
                <div className='h-10 w-full absolute bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex justify-center space-x-3'>
                    <div
                        onClick={() => dispatch(modalOpen())}
                        className="h-10 w-10 bg-secondary rounded-full shadow-md flex justify-center items-center text-gray-500">
                        <i className="fa-solid fa-eye"></i>
                    </div>
                    <div
                        className="h-10 w-10 bg-secondary rounded-full shadow-md flex justify-center items-center text-gray-500">
                        <i className="fa-solid fa-heart"></i>
                    </div>
                    <Link to={`/productDetails/${_id}`} >
                        <div
                            className="h-10 w-10 bg-secondary rounded-full shadow-md flex justify-center items-center text-gray-500">
                            <i className="fa-solid fa-bag-shopping"></i>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='mt-3'>
                <h1 className='text-md font-medium '>{title}</h1>
                <h1 className='text-xl font-bold '>Price: ${price}</h1>
                <h1 className='text-sm font-medium '>
                    Rating: <ReactRating
                        change={false}
                        rating={netRating}
                    /> ({reviews?.length})
                </h1>
            </div>
        </div>
    );
};

export default ProductCard;