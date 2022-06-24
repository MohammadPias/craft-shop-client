import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useFirebase from '../../Hooks/useFirebase';
import logo from '../../images/logo.svg'

const Register = () => {
    const { handleGoogleSignIn, handleRegistration } = useFirebase();
    const error = useSelector(state => state?.user?.error);

    const navigate = useNavigate();
    const location = useLocation();
    const destination = location.state?.from?.pathname || '/login';

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    });
    const onSubmit = data => {
        console.log(data)
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const password2 = data.password2;

        if (password === password2) {
            handleRegistration(email, password, name, navigate, destination)
        }
        else {
            toast.warn("Password Don't Match")
        }
    };
    return (
        <div className='mt-14 max-h-screen flex justify-center items-center sm:mt-28'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-secondary p-5 border border-gray-300 rounded-md shadow-sm'>
                <img className='w-1/2 mx-auto' src={logo} alt="" />
                <h5 className='text-center font-bold text-lg text-gray-500 mt-3'>Register</h5>
                <Controller

                    name="name"
                    control={control}
                    render={({ field }) => <input className="w-full border border-gray-300 focus:outline-none text-center mt-3 p-1" placeholder='full name' {...field} />}
                />
                <br />
                <Controller

                    name="email"
                    control={control}
                    render={({ field }) => <input className="w-full border border-gray-300 focus:outline-none text-center mt-3 p-1" placeholder='email' {...field} />}
                />
                <br />
                <Controller

                    name="password"
                    control={control}
                    render={({ field }) => <input type='password' className="w-full border border-gray-300 focus:outline-none text-center mt-3 p-1" placeholder='password' {...field} />}
                />
                <br />
                <Controller

                    name="password2"
                    control={control}
                    render={({ field }) => <input type='password' className="w-full border border-gray-300 focus:outline-none text-center mt-3 p-1" placeholder='re-enter password' {...field} />}
                />
                <br />
                <button type='submit' className='btn btn-primary w-full mt-3 p-1 hover:bg-tertiary transition duration-150'>Register</button>
                <ToastContainer />
                <p className='mt-2 text-gray-500'>Already have an account? <Link to='/login' className='text-gray-700 font-medium'>Login</Link></p>
                <button onClick={() => handleGoogleSignIn(navigate, destination)} className='flex justify-center items-center bg-white border border-gray-300 p-1 mt-3 font-medium text-gray-600 w-full shadow-sm'>
                    <img className='w-6 h-6' src="https://img.icons8.com/fluency/48/000000/google-logo.png" alt='' />
                    <h1 className='ml-5'>Google SignIn</h1>
                </button>
                {
                    error &&
                    <div className="warning mt-3 px-3">
                        {error}
                    </div>
                }
            </form>
        </div>
    );
};

export default Register;