import { queries } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { addToCart, countCart } from '../../../features/cartSlice/cartSlice';
import LoaderComponent from '../../common/Loder/Loder';
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
        _id,
        title,
        info,
        price,
        rating,
        color,
        category,
        material,
        stock,
        brand,
        img,
    } = product;

    let ratingCount = 0;
    if (rating?.length > 0) {
        for (const rate of rating) {
            ratingCount = ratingCount + rate;
        }
    };
    const navigate = useNavigate()
    return (
        <div>
            <Header />
            {
                !product.title ?
                    <LoaderComponent />
                    :
                    <div className='sm:container h-full p-5 lg:mt-10'>
                        <div className='p-5 border-b border-b-gray-300'>
                            <h1 className='text-xl lg:text-3xl font-medium text-center'>{title}</h1>
                            <div className='flex justify-center space-x-3 mt-3 text-gray-500'>
                                <h5 className='text-md'>Category: <span className='font-bold text-gray-700'>{category}</span></h5>
                                <h5 className='text-md'>Brand: <span className='font-bold text-gray-700'>{brand}</span></h5>
                                <h5 className='text-md'>Rating: <span className='font-bold text-gray-700'>
                                    <ReactRating
                                        change={false}
                                        rating={ratingCount / rating?.length} />
                                </span> ({rating.length} Reviews)</h5>
                            </div>
                        </div>
                        <button onClick={() => navigate(-1)} className="btn btn-primary h-12 mt-5">Go Back</button>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
                            <div>
                                <img className='w-full h-full object-contain' src={img} alt="" />
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
            }
            <Footer />
        </div>
    );
};

export default ProductDetails;