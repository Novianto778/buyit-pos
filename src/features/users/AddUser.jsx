import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../common/components/Button';
import ReactSelect from 'react-select';
import { useAddUser, useUpdateUser, useUserById } from './queries';
import { useNavigate, useParams } from 'react-router-dom';
import useLoading from '../../common/hooks/useLoading';
import { useEffect } from 'react';

const AddUser = ({ isEdit }) => {
    const { mutate: addUser, isLoading: addLoading } = useAddUser();
    const { mutate: updateUser, isLoading: updateLoading } = useUpdateUser();
    const { id } = useParams();
    const { data, isLoading } = useUserById(id);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const option = [
        { value: 'admin', label: 'Admin' },
        { value: 'cashier', label: 'Cashier' },
    ];

    const activeOption = [
        { value: true, label: 'Aktif' },
        { value: false, label: 'Tidak Aktif' },
    ];

    const onSubmit = (data) => {
        const newData = {
            ...data,
            roles: data.roles.map((role) => role.value),
            active: data.active.value,
        };
        if (isEdit) {
            updateUser({ id, ...newData });
        } else {
            addUser(newData);
        }
    };

    useEffect(() => {
        if (isEdit) {
            // if (!data?.username && !isLoading) {
            //     navigate('/404');
            // }
            setValue('username', data?.username);
            setValue('password', '********');
            setValue(
                'roles',
                data?.roles?.map((role) => {
                    return { value: role, label: role };
                })
            );
            setValue('active', { value: true, label: 'Aktif' });
        }
    }, [
        data?.active,
        data?.password,
        data?.roles,
        data?.username,
        isEdit,
        setValue,
        navigate,
        isLoading,
    ]);

    useLoading(isLoading && isEdit);
    if (isLoading && isEdit) return <div>Loading...</div>;

    return (
        <>
            <h1 className="text-xl font-bold">
                {isEdit ? 'Edit' : 'Tambah'} User
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="mt-8">
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium"
                            >
                                Username
                            </label>
                        </div>
                        <input
                            {...register('username')}
                            id="username"
                            placeholder="Masukkan Username"
                            className="text-field col-span-3"
                        />
                    </div>
                    {errors.username && (
                        <p className="text-red-500 text-sm">
                            {errors.username.message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>
                        </div>
                        <input
                            {...register('password')}
                            id="password"
                            placeholder="********"
                            className="text-field col-span-3"
                            type="password"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}

                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="roles"
                                className="text-sm font-medium"
                            >
                                Roles
                            </label>
                        </div>
                        <Controller
                            name="roles"
                            control={control}
                            render={({ field, value }) => {
                                return (
                                    <ReactSelect
                                        {...field}
                                        isMulti
                                        className="col-span-2"
                                        options={option}
                                    />
                                );
                            }}
                        />
                    </div>
                    {errors.roles && (
                        <p className="text-red-500 text-sm">
                            {errors.roles.message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 items-center mt-4">
                        <div className="col-span-1">
                            <label
                                htmlFor="active"
                                className="text-sm font-medium"
                            >
                                Active
                            </label>
                        </div>
                        <Controller
                            name="active"
                            control={control}
                            render={({ field, value }) => (
                                <ReactSelect
                                    {...field}
                                    className="col-span-2"
                                    options={activeOption}
                                />
                            )}
                        />
                    </div>
                    {errors.active && (
                        <p className="text-red-500 text-sm">
                            {errors.active.message}
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

export default AddUser;
