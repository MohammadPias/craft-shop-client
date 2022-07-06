import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';
import { updateUserImage } from '../../../features/user/userSlice';
import useFirebase from '../../../Hooks/useFirebase';
import userPhoto from '../../../images/user.png'
import ShippingProfile from './ShippingProfile';


const Profile = () => {
    const [shipping, setShipping] = useState({});
    const [isPassChange, setIsPassChange] = useState(false)
    const [photo, setPhoto] = useState(null);
    const [image, setImage] = useState(null)
    const user = useSelector(state => state?.user?.result)
    const { handleUpdatePassword, updateFirebaseProfile } = useFirebase()

    const dispatch = useDispatch();
    // console.log(shipping, user?.email)
    const [data, setData] = useState({
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        password: null,
        password2: null,
    })

    useEffect(() => {
        instance.get(`/users/find?email=${user?.email}`)
            .then(res => {
                // console.log(res.data.shipping)
                setShipping(res?.data?.shipping)
            })
    }, [user?.email])

    useEffect(() => {
        if (photo && user?.email) {
            if (photo.size <= 307200) {
                const formData = new FormData();
                formData.append('photoURL', photo)

                instance.put(`/users/profile?email=${user?.email}`, formData)
                    .then(res => {
                        console.log(res?.data?.result?.modifiedCount, res?.data?.photoURL)
                        if (res?.data?.result?.modifiedCount > 0) {
                            dispatch(updateUserImage(res?.data?.photoURL))
                            const form = { photoURL: res?.data?.photoURL }
                            updateFirebaseProfile(form)
                        }
                    })
            }
            else {
                alert('Please upload image less than 300 KB')
            }
        }
    }, [photo, user?.email, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data)
        const form = { displayName: data?.displayName }
        updateFirebaseProfile(form)

    }
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // console.log('console from password change', data)
        if (data?.password !== null && data?.password === data?.password2) {
            console.log('console from password change', data)
            handleUpdatePassword(data?.password)
            toast.success('Your password has been changed successfully')
        }
        else {
            alert("Password don't match.")
        }
    }
    return (
        <div>
            {/* <h1 className="heading">My Profile</h1> */}
            <div className='grid grid-cols-1 lg:grid-cols-4 lg:gap-5'>
                <div className=''>
                    <h1 className="text-center text-lg font-medium text-gray-500">Profile</h1>
                    <div className='bg-gray-50 border border-gray-200 p-3 mt-2 rounded-md'>
                        <div className='h-24 w-24 rounded-full mx-auto mb-3 relative '>
                            <div className='overflow-hidden h-24 w-24 rounded-full'>

                                <img className='w-full object-contain rounded-full' src={user?.photoURL?.startsWith('https') ? `${user?.photoURL}` : user?.photoURL ? `data:image/png;base64, ${user?.photoURL}` : userPhoto} alt="" />
                            </div>

                            <div className='absolute -right-8 top-8'>
                                <label htmlFor="profile">
                                    <i
                                        className="fa-solid fa-camera text-2xl text-gray-600"></i>
                                </label>
                                <input onChange={e => setPhoto(e.target.files[0])} className='hidden' type="file" name="photoURL" id="profile" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='text-sm text-gray-400 font-medium' htmlFor='name'>Name :</label>
                                <input
                                    onChange={e => setData({ ...data, displayName: e.target.value })}
                                    defaultValue={data?.displayName}
                                    name='displayName'
                                    type='text'
                                    id='name'
                                    className='w-full border border-gray-200 py-1 focus:outline-gray-300 rounded-md text-gray-500 text-center'
                                />
                            </div>
                            <div>
                                <label className='text-sm text-gray-400 font-medium' htmlFor='email'>Email : (You can't change email.)</label>
                                <input
                                    readOnly
                                    onChange={e => setData({ ...data, email: e.target.value })}
                                    defaultValue={data?.email}
                                    name='email'
                                    type='email'
                                    id='email'
                                    className='w-full border border-gray-200 py-1 focus:outline-gray-300 rounded-md text-gray-500 text-center'
                                />
                            </div>
                            {/* <div>
                                <label className='text-sm text-gray-400 font-medium' htmlFor='photoURL'>PhotoURL :</label>
                                <input
                                    onChange={e => setData({ ...data, photoURL: e.target.value })}
                                    defaultValue={data?.photoURL}
                                    name='photoURL'
                                    type='text'
                                    id='photoURL'
                                    className='w-full border border-gray-200 py-1 focus:outline-gray-300 rounded-md text-gray-500 text-center'
                                />
                            </div> */}
                            <button type='submit' className="btn btn-primary text-sm py-1.5 rounded-md w-full mt-3">update</button>
                        </form>
                        <button onClick={() => setIsPassChange(!isPassChange)} className="btn btn-secondary text-sm py-1.5 rounded-md w-full mt-3">Change Password</button>
                        {
                            isPassChange &&
                            <form onSubmit={handlePasswordSubmit}>
                                <div>
                                    <label className='text-sm text-gray-400 font-medium' htmlFor='pass'>Password :</label>
                                    <input
                                        onChange={e => setData({ ...data, password: e.target.value })}
                                        name='password'
                                        type='password'
                                        id='pass'
                                        className='w-full border border-gray-200 py-1 focus:outline-gray-300 rounded-md text-gray-500 text-center'
                                    />
                                </div>
                                <div>
                                    <label className='text-sm text-gray-400 font-medium' htmlFor='pass2'>Re-enter Password :</label>
                                    <input
                                        onChange={e => setData({ ...data, password2: e.target.value })}
                                        name='password2'
                                        type='password'
                                        id='pass2'
                                        className='w-full border border-gray-200 py-1 focus:outline-gray-300 rounded-md text-gray-500 text-center'
                                    />
                                </div>
                                <button type='submit' className="btn btn-primary text-sm py-1.5 w-full mt-3 rounded-md">update Password</button>
                            </form>
                        }
                    </div>
                </div>
                <div className='col-span-3'>
                    <h1 className="text-center text-lg font-medium text-gray-500">Shipping</h1>
                    <div className='mt-3'>

                        {
                            shipping?.email &&
                            <ShippingProfile shipping={shipping} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;