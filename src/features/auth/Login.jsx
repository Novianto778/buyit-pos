import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from './queries';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { mutate, isLoading } = useLogin();

    const onSubmit = (data) => {
        mutate(data);
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 tracking-[4px] dark:text-white">
                    BuyIt
                </p>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 md:space-y-6"
                            action="#"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your Username
                                </label>
                                <input
                                    type="username"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="johndoe"
                                    {...register('username', {
                                        required: 'username is required',
                                    })}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-md">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('password', {
                                        required: 'password is required',
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-md">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Forgot password?
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full disabled:cursor-not-allowed disabled:bg-blue-300 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading' : 'Sign In'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{' '}
                                <span className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Sign up
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
