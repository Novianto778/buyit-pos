import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../common/components/Button';
import useUserStore from '../../store/userStore';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import {
    useAddProduct,
    useCategories,
    useProductById,
    useUpdateProduct,
} from './queries';
import { useParams } from 'react-router-dom';
import useLoading from 'common/hooks/useLoading';
import axios from 'api/axios';

const AddProduct = ({ isEdit }) => {
    const { id: productId } = useParams();
    const { mutate: addProduct, isLoading: addLoading } = useAddProduct();
    const { mutate: updateProduct, isLoading: updateLoading } =
        useUpdateProduct();

    const { userId } = useUserStore((state) => state.user);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const { data, isLoading: loadingCategories } = useCategories();
    const { data: currentProduct, isLoading } = useProductById(productId);

    const option = data?.map((category) => {
        return { value: category, label: category };
    });

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onload = function () {
            const fileText = reader.result;
            setImage(fileText);
        };
        reader.readAsDataURL(file);
    }

    const onSubmit = async (data) => {
        // make image to filelist

        // form data
        let formData = new FormData();
        formData.append('picture', file);
        formData.append('name', data.name);
        formData.append('price', data.price);
        // formData.append('user', data.user);
        // append array of categories
        data.categories.forEach((category) => {
            formData.append('categories', category.value.toLowerCase());
        });
        formData.append('description', data.description);

        if (isEdit) {
            formData.append('id', productId);
            updateProduct(formData);
        } else {
            addProduct(formData);
        }
    };

    useEffect(() => {
        if (currentProduct) {
            setImage(axios.defaults.baseURL + 'files/' + currentProduct.image);
            setValue('name', currentProduct.name);
            setValue('price', currentProduct.price);
            setValue('description', currentProduct.description);
            setValue(
                'categories',
                currentProduct.categories?.map((category) => {
                    return { value: category, label: category };
                })
            );
        }
    }, [currentProduct, setValue]);

    useLoading((isEdit && isLoading) || loadingCategories);

    if ((isEdit && isLoading) || loadingCategories)
        return <div>Loading...</div>;

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4"
                encType="multipart/form-data"
            >
                <div className="mt-8">
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium"
                            >
                                Image
                            </label>
                        </div>
                        <div className="flex bg-grey-lighter col-span-3 max-h-60">
                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                                {!image ? (
                                    <>
                                        <svg
                                            className="w-8 h-8"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-base leading-normal">
                                            Select a file
                                        </span>
                                    </>
                                ) : (
                                    <img
                                        src={image}
                                        alt=""
                                        className="overflow-hidden bg-cover"
                                    />
                                )}
                                <input
                                    {...register('picture')}
                                    type="file"
                                    name="picture"
                                    className="hidden"
                                    onChange={handleFileInputChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Product Name
                            </label>
                        </div>
                        <input
                            {...register('name')}
                            id="name"
                            placeholder="Masukkan Product Name"
                            className="text-field col-span-3"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="price"
                                className="text-sm font-medium"
                            >
                                Price
                            </label>
                        </div>
                        <input
                            {...register('price')}
                            id="price"
                            placeholder="10000"
                            className="text-field col-span-3"
                            type="number"
                        />
                    </div>
                    {errors.price && (
                        <p className="text-red-500 text-sm">
                            {errors.price.message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="price"
                                className="text-sm font-medium"
                            >
                                Description
                            </label>
                        </div>
                        <textarea
                            {...register('description')}
                            id="description"
                            placeholder="product description"
                            className="text-field col-span-3"
                        />
                    </div>
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="price"
                                className="text-sm font-medium"
                            >
                                Categories
                            </label>
                        </div>
                        <Controller
                            name="categories"
                            control={control}
                            render={({ field, value }) => {
                                return (
                                    <CreatableSelect
                                        {...field}
                                        className="col-span-3"
                                        isMulti
                                        options={option}
                                    />
                                );
                            }}
                        />
                    </div>
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}

                    <div className="flex items-center gap-x-4 mt-8">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={addLoading || updateLoading}
                            className="disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {addLoading || updateLoading
                                ? 'Loading...'
                                : isEdit
                                ? 'Edit'
                                : 'Tambah'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddProduct;
