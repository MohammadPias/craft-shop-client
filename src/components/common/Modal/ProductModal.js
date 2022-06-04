import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast, ToastContainer } from 'react-toastify';
import { instance } from '../../../Api/ProductApi';

const ProductModal = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            category: '',
            color: '',
            rating: '',
            brand: "",
            img: " ",
            info: " ",
            material: " ",
            price: " ",
            stock: " ",
            title: " ",
        }
    });
    const onSubmit = data => {
        // const currDate = new Date();
        // const date = currDate.toLocaleDateString()
        const newData = {

            ...data,
            rating: [data?.rating?.label],
            category: data.category.label,
            color: data.color.label,

        }
        console.log(newData)
        // console.log(data)
        instance.post('/products', newData)
            .then(res => {
                toast.success('Product has been added successfully.');
                reset();
            })
            .catch(error => console.log(error))
    };

    const SelectInput = ({ title, data }) => {
        return (
            <div>
                <label className='text-sm font-medium '>{title}</label>
                <Controller
                    name={title}
                    control={control}
                    render={({ field }) => <Select
                        className='w-full py-2 my-2 focus:outline-none text-gray-500'
                        {...field}
                        options={data}
                    />
                    }
                />
            </div>
        )
    };

    const InputText = ({ title, value }) => {
        return (
            <div>
                <label className='text-sm font-medium '>{title}</label>
                <Controller
                    name={value}
                    control={control}
                    render={({ field }) => <input
                        className='w-full border border-gray-300 py-1.5 my-3 rounded-md focus:outline-2 focus:outline-blue-400 text-gray-500'
                        {...field} />}
                />
            </div>
        )
    }
    return (
        <div>
            <h1 className="font-bold text-gray-600 my-4 text-center text-xl">Add Product</h1>
            <div>
                <ToastContainer />
                <form
                    className='w-full bg-gray-50 p-5 shadow-md'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className='shadow-sm p-5 border border-gray-200 bg-white'>
                            <SelectInput
                                title="category"
                                data={[
                                    { value: "basket", label: "Basket" },
                                    { value: "footwear", label: "Footwear" },
                                ]}
                            />
                            <SelectInput
                                title="color"
                                data={[
                                    { value: 'white', label: "White" },
                                    { value: "brown", label: "Brown" },
                                    { value: "orange", label: "Orange" },
                                    { value: "naturalGolden", label: "Natural Golden" },
                                    { value: "beige", label: "Beige" },
                                    { value: "red", label: "Red" },
                                    { value: "black", label: "Black" },
                                    { value: "gray", label: "Gray" },
                                    { value: "blue", label: "Blue" },
                                    { value: "yellow", label: "Yellow" },
                                ]}
                            />
                            <SelectInput
                                title="rating"
                                data={[
                                    { value: 5, label: 5 },
                                    { value: 4, label: 4 },
                                    { value: 3, label: 3 },
                                    { value: 2, label: 2 },
                                    { value: 1, label: 1 },
                                    { value: 0, label: 0 },
                                ]}
                            />
                        </div>
                        <div className='shadow-sm p-5 border border-gray-200 bg-white'>
                            <InputText title="Product title" value='title' />
                            <InputText title="Price" value='price' />
                            <InputText title="Brand" value='brand' />
                        </div>
                        <div className='shadow-sm p-5 border border-gray-200 bg-white'>
                            <InputText title="Material" value='material' />
                            <InputText title="In-stock" value='stock' />
                            <label className='text-sm font-medium '>Description</label>
                            <Controller
                                name='info'
                                control={control}
                                render={({ field }) => <textarea
                                    className='w-full border border-gray-300 py-2 my-2 focus:outline-none text-gray-500'
                                    {...field} />}
                            />
                        </div>

                    </div>
                    <label className='text-sm font-medium '>Image Url</label>
                    <Controller
                        name='img'
                        control={control}
                        render={({ field }) => <input
                            className='w-full border border-gray-300 py-2 my-2 focus:outline-none text-gray-500 shadow-sm'
                            {...field} />}
                    />
                    <div className="flex justify-center">
                        <button className='btn btn-primary py-2 my-3' type="submit" >Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;