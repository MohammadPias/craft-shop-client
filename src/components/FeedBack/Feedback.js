import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { instance } from '../../Api/ProductApi';
import ReactRating from '../common/ReactRating/ReactRating';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Feedback = () => {
    const user = useSelector(state => state.user.result)
    const [order, setOrder] = useState({});
    // const [ratingValue, setFormData] = useState(0);


    const { orderId } = useParams();
    // console.log(user)

    // console.log(order)
    useEffect(() => {
        instance.get(`/findOrder/${orderId}`)
            .then(res => setOrder(res.data))
    }, [orderId])



    const ReviewCard = ({ item }) => {
        const [formData, setFormData] = useState({
            name: user?.displayName,
            email: user?.email,
            feedback: '',
            rating: 0,
        })
        console.log(formData)
        const handleOnSubmit = (e) => {
            e.preventDefault();

            if (item?._id) {
                instance.put(`/products/${item._id}`, {
                    formData,
                })
                    .then(res => {
                        console.log(res.data)
                    })
            }
        }
        return (
            <div className='grid grid-cols-1 lg:grid-cols-2 border-b border-b-gray-200'>
                <div>
                    <img className='w-2/3 mx-auto' src={item?.img} alt="" />
                </div>
                <div className=''>
                    <div className=''>
                        <h1 className="text-2xl font-bold text-gray-500 text-center">{item?.title}</h1>
                        <div className="text-center flex justify-center items-center border-b border-b-gray-200 pb-3">
                            <h2 className="text-md font-medium mr-3 text-gray-400">Category: {item?.category}</h2>
                            <h2 className="text-md font-medium mr-3 text-gray-400">Brand: {item?.brand}</h2>
                            <h2 className="text-md font-medium mr-3 text-gray-400">Rating :
                                <ReactRating rating={item?.rating} />
                            </h2>
                        </div>
                        <div className='p-5'>
                            <h1 className="text-lg">
                                <ReactRating
                                    setFormData={setFormData}
                                    formData={formData}
                                    change={true} />
                            </h1>
                        </div>
                        <form className='p-5' onSubmit={handleOnSubmit}>
                            <label className='text-gray-400 font-medium' htmlFor="name">Your Name</label>
                            <br />
                            <input
                                name='name'
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                value={formData?.name}
                                className='border border-gray-300 rounded-sm w-full focus:outline outline-gray-400 p-1 mb-3 focus:shadow-md'
                                type="text"
                                id='name' />
                            <br />
                            <label className='text-gray-400 font-medium' htmlFor="email">Your Email</label>
                            <br />
                            <input
                                name='email'
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                value={formData?.email}
                                className='border border-gray-300 rounded-sm w-full focus:outline outline-gray-400 p-1 mb-3 focus:shadow-md'
                                type="email"
                                id='email' />
                            <br />
                            <label className='text-gray-400 font-medium' htmlFor="feedback">Feedback</label>
                            <br />
                            <textarea
                                name='feedback'
                                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                                value={formData?.feedback}
                                className='border border-gray-300 rounded-sm w-full focus:outline outline-gray-400 p-1 mb-3 focus:shadow-md'
                                type="text"
                                id='feedback' />
                            <br />
                            <button type='submit' className='btn btn-primary w-full py-2 rounded-sm'>Submit</button>
                        </form>
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