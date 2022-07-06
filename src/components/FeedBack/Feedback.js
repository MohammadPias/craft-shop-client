import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { instance } from '../../Api/ProductApi';
import { updateProduct } from '../../features/products/productSlice';
import NewForm from '../common/NewForm/NewForm';
import ReactRating from '../common/ReactRating/ReactRating';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Feedback = () => {
    const user = useSelector(state => state.user.result)
    const [order, setOrder] = useState({});
    // const [ratingValue, setFormData] = useState(0);


    const { orderId } = useParams();
    // const dispatch = useDispatch();
    // console.log(user)

    console.log(order)
    useEffect(() => {
        instance.get(`/orders/findOrder/${orderId}`)
            .then(res => setOrder(res.data))
    }, [orderId])



    const ReviewCard = ({ item }) => {
        const [formData, setFormData] = useState({
            name: user?.displayName,
            email: user?.email,
            feedback: '',
            rating: 0,
        })
        // console.log(formData)
        const handleOnSubmit = (e) => {
            e.preventDefault();

            if (item?._id) {
                instance.put(`/products/${item._id}`, {
                    formData,
                })
                    .then(res => {
                        console.log(res.data)
                        if (res?.data?.modifiedCount > 0) {
                            // dispatch(updateProduct({reviews: formData, id: item}))
                            toast.success('Thank you for your kind feedback')
                            setFormData({
                                name: '',
                                email: '',
                                feedback: '',
                                rating: 0,
                            })
                        }
                    })
            }
        }
        return (
            <div className='grid grid-cols-1 lg:grid-cols-2 border-b border-b-gray-200'>
                <div className='flex justify-center items-center'>
                    <img className='w-2/3 mx-auto' src={item?.img} alt="" />
                </div>
                <div className=''>
                    <div className=''>
                        <h1 className="text-2xl font-bold text-gray-500 text-center">{item?.title}</h1>
                        <div className="text-center flex justify-center items-center border-b border-b-gray-200 pb-3">
                            <h2 className="text-md font-medium mr-3 text-gray-400">Category: {item?.category}</h2>
                            <h2 className="text-md font-medium mr-3 text-gray-400">Brand: {item?.brand}</h2>
                            <h2 className="text-md font-medium mr-3 text-gray-400">price: ${item?.price}
                            </h2>
                        </div>
                        <div className='p-5'>
                            <h1 className="text-lg">
                                <ReactRating
                                    size='big'
                                    setFormData={setFormData}
                                    formData={formData}
                                    change={true} />
                            </h1>
                        </div>
                        <div className='p-5'>
                            <NewForm
                                formData={formData}
                                setFormData={setFormData}
                                handleOnSubmit={handleOnSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Header />
            <div className='grid grid-cols-1 mt-16 lg:mt-20 container'>
                {
                    order?.result?.map((item, index) => <ReviewCard item={item} key={index}></ReviewCard>)
                }
            </div>
            <Footer />

        </div>
    );
};

export default Feedback;