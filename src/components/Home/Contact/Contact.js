import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Map from '../../common/Google/Map';
import NewForm from '../../common/NewForm/NewForm';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {

    const user = useSelector(state => state.user.result)
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: user?.displayName,
        email: user?.email,
        body: '',
        subject: '',
    })
    // const form = useRef()
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(formRef.current)

        if (formData?.email) {
            emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, formRef.current, process.env.REACT_APP_PUBLIC_KEY)
                .then((result) => {
                    console.log(result.text);
                    formRef.current.reset();
                    toast.success('Thanks for messaging us')
                }, (error) => {
                    console.log(error.text);
                });
        }
    }
    return (
        <div className='lg:container' id='contact'>
            <h1 className="heading">Contact Us</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                <div>
                    <Map />
                </div>
                <div className='p-3 border border-gray-200'>
                    <h1 className="text-lg font-medium text-center text-gray-500">
                        Get in touch
                    </h1>
                    <NewForm
                        type='contact'
                        formData={formData}
                        setFormData={setFormData}
                        handleOnSubmit={handleOnSubmit}
                        formRef={formRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;