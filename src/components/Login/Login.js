import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import logo from '../../images/logo.svg'

const Login = () => {
    const { handleGoogleSignIn, handleSignIn } = useFirebase();
    const error = useSelector(state => state?.user?.error);

    const navigate = useNavigate();
    const location = useLocation();
    const destination = location?.state?.from || '/';

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;

        handleSignIn(email, password, navigate, destination)
    };
    return (
        <div className='mt-14 max-h-screen flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center sm:mt-24 bg-secondary p-5 border border-gray-300 rounded-md shadow-sm'>
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <img className='w-1/2 mx-auto' src={logo} alt="" />
                    <h5 className='text-center font-bold text-lg text-gray-500 mt-3'>Login</h5>
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
                    <button type='submit' className='btn btn-primary w-full mt-3 p-1 hover:bg-tertiary transition duration-150'>Login</button>
                    <p className='mt-2 text-gray-500'>New to Craft Shop? <Link to='/register' className='text-gray-700 font-medium'>Register</Link></p>

                    {
                        error &&
                        <div className="warning mt-3 px-3">
                            {error}
                        </div>
                    }
                </form>
                <button onClick={() => handleGoogleSignIn(navigate, destination)} className='flex justify-center items-center bg-white border border-gray-300 p-1 mt-3 font-medium text-gray-600 w-full shadow-sm'>
                    <img className='w-6 h-6' src="https://img.icons8.com/fluency/48/000000/google-logo.png" alt='' />
                    <h1 className='ml-5'>Google SignIn</h1>
                </button>
            </div>
        </div>
    );
};

export default Login;