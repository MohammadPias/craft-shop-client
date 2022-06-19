import React from 'react';

const NewForm = ({ formData, setFormData, handleOnSubmit, type, formRef }) => {
    return (
        <form className='' onSubmit={handleOnSubmit} ref={formRef}>
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
            {
                type === 'contact' &&

                <>
                    <label className='text-gray-400 font-medium' htmlFor="sub">Subject</label>
                    <br />
                    <input
                        name='subject'
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        value={formData?.subject}
                        className='border border-gray-300 rounded-sm w-full focus:outline outline-gray-400 p-1 mb-3 focus:shadow-md'
                        type="text"
                        id='sub' />
                    <br />
                </>
            }
            <label className='text-gray-400 font-medium' htmlFor="feedback">{type === 'contact' ? 'Message' : 'Feedback'}</label>
            <br />
            {
                type === 'contact' ?
                    <textarea
                        name='body'
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        value={formData?.body}
                        className='border border-gray-300 rounded-sm w-full focus:outline outline-gray-400 p-1 mb-3 focus:shadow-md'
                        type="text"
                        id='feedback' />
                    :
                    <textarea
                        name='feedback'
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        value={formData?.feedback}
                        className='border border-gray-300 rounded-sm w-full focus:outline outline-gray-400 p-1 mb-3 focus:shadow-md'
                        type="text"
                        id='feedback' />
            }

            <br />
            <button type='submit' className='btn btn-primary w-full py-2 rounded-sm'>Submit</button>
        </form>
    );
};

export default NewForm;