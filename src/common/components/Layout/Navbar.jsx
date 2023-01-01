import React from 'react';
import useUserStore from 'store/userStore';

const Navbar = () => {
    const user = useUserStore((state) => state.user);

    return (
        <nav
            className={`bg-white px-4 py-2 w-full h-12 flex items-center justify-between gap-x-2 rounded-lg`}
        >
            <p className="text-gray-700 text-sm font-medium">
                {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
            <div className="md:flex items-center gap-x-2 hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <h2 className="font-semibold capitalize">
                    Hi, {user?.username}
                </h2>
            </div>
        </nav>
    );
};

export default Navbar;
