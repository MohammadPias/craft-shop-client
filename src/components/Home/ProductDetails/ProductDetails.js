import { queries } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { addToCart, countCart } from '../../../features/cartSlice/cartSlice';
import LoaderComponent from '../../common/Loader/Loader';
import ReactRating from '../../common/ReactRating/ReactRating';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';

const ProductDetails = ({ value }) => {
    const [product, setProduct] = useState({});
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()


    useEffect(() => {
        if (productId) {
            instance.get(`/products/${productId}`)
                .then(res => setProduct(res.data))
                .catch(error => console.log(error))
        }
    }, [productId]);

    const {
        title,
        info,
        price,
        color,
        category,
        material,
        stock,
        brand,
        img,
        reviews,
        image,
    } = product;



    let totalRating = 0;
    let netRating = 0;
    let oneStar = 0;
    let twoStar = 0;
    let threeStar = 0;
    let fourStar = 0;
    let fiveStar = 0;

    if (reviews?.length > 0) {
        oneStar = reviews.filter(item => item.rating === 1).length;
        twoStar = reviews.filter(item => item.rating === 2).length;
        threeStar = reviews.filter(item => item.rating === 3).length;
        fourStar = reviews.filter(item => item.rating === 4).length;
        fiveStar = reviews.filter(item => item.rating === 5).length;
        for (const review of reviews) {
            totalRating += review.rating
        }
        netRating = totalRating / reviews?.length
    }
    const navigate = useNavigate()

    const ReviewCount = ({ rating, star }) => {
        return (
            <div className='flex space-x-5 items-center mb-2'>
                <ReactRating
                    size='big'
                    change={false}
                    rating={rating}
                />
                <h2 className="text-xl font-medium text-gray-400">({star})</h2>
            </div>
        )
    }
    console.log(reviews?.length < 0)
    return (
        <div>
            <Header />
            {
                !product.title ?
                    <LoaderComponent />
                    :
                    <div className='sm:container h-full p-5 lg:mt-10'>
                        <div className='border-b border-b-gray-200'>
                            <div className='p-5 border-b border-b-gray-300'>
                                <h1 className='text-xl lg:text-3xl font-medium text-center'>{title}</h1>
                                <div className='flex justify-center space-x-3 mt-3 text-gray-500'>
                                    <h5 className='text-md'>Category: <span className='font-bold text-gray-700'>{category}</span></h5>
                                    <h5 className='text-md'>Brand: <span className='font-bold text-gray-700'>{brand}</span></h5>
                                    <h5 className='text-md'>Rating: <span className='font-bold text-gray-700'>
                                        <ReactRating
                                            change={false}
                                            rating={netRating} />
                                    </span> ({netRating}, {reviews?.length} Reviews)</h5>
                                </div>
                            </div>
                            <button onClick={() => navigate(-1)} className="btn btn-primary h-12 mt-5">Go Back</button>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
                                <div>
                                    <img className='w-full h-full object-contain' src={image ? `data:image/png;base64, ${image}` : img} alt="" />
                                </div>
                                <div className='col-span-2 text-gray-500 lg:px-10'>
                                    <h5 className='text-lg font-medium'>Price: <span className='font-bold text-gray-700'>${price}</span></h5>
                                    <div className='bg-green-100 text-green-700 py-2 px-4 w-24 rounded-full mt-3'>
                                        <h5>{stock > 0 ? 'In-Stock' : 'Stock Out'}</h5>
                                    </div>
                                    <h5 className='text-lg font-medium mt-3'>Color: <span className='font-bold text-gray-700'>{color}</span></h5>
                                    <h5 className='text-lg font-medium mt-3'>Material: <span className='font-bold text-gray-700'>{material}</span></h5>
                                    <h4 className='mt-3 text-md'>{info?.slice(0, 250)}</h4>

                                    <div className='flex justify-start space-x-3 flex-wrap mt-3'>
                                        <div>
                                            <button
                                                disabled={quantity <= 1 && true}
                                                onClick={() => setQuantity((currQuantity) => currQuantity - 1)}
                                                className='w-12 h-12 bg-primary font-medium rounded-l-full text-white' >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>

                                            <input
                                                className='w-12 h-12  text-md font-medium text-center focus:outline-none ml-2'
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            />

                                            <button
                                                onClick={() => setQuantity((currQuantity) => currQuantity + 1)}
                                                className='w-12 h-12 bg-primary font-medium rounded-r-full text-white' >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    toast.success('Product has been added successfully.')
                                                    dispatch(addToCart({ product, quantity }))
                                                    dispatch(countCart())
                                                }}
                                                className="btn btn-primary h-12 rounded-full">Add Card</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 mt-5">
                            <div>
                                <h1 className="text-2xl font-medium text-gray-500 mb-3">Rating</h1>
                                <div className="mb-3">
                                    <h2 className="text-lg font-medium text-gray-400">Total Rating: ({reviews?.length})</h2>
                                    <h2 className="text-lg font-medium text-gray-400">Average Rating: ({netRating})</h2>
                                </div>
                                <ReviewCount rating={1} star={oneStar} />
                                <ReviewCount rating={2} star={twoStar} />
                                <ReviewCount rating={3} star={threeStar} />
                                <ReviewCount rating={4} star={fourStar} />
                                <ReviewCount rating={5} star={fiveStar} />
                            </div>
                            <div className="col-span-2">
                                <h1 className="text-xl font-medium text-gray-500">
                                    Comments
                                </h1>
                                {
                                    !reviews?.length &&
                                    <div className='bg-red-50 p-4 text-center w-full mt-5 text-red-600'>No Reviews</div>
                                }
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5'>
                                    {

                                        reviews?.length > 0 &&

                                        [...reviews].reverse().slice(0, 4)?.map((item, index) =>
                                            <div
                                                className='p-4 border border-gray-200 shadow-sm'
                                                key={index}>
                                                <h1 className="font-bold text-gray-500">{item.name}</h1>
                                                <h2 className='text-gray-400 font-medium'>
                                                    Rating :
                                                    <ReactRating change={false} rating={item.rating} />
                                                </h2>
                                                <p className='text-gray-400'>{item.feedback}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

            }
            <Footer />
        </div>
    );
};

export default ProductDetails;