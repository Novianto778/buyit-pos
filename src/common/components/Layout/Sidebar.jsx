import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from 'store/userStore';
import { useLogout } from '../../../features/auth/queries';

const sidebarLinks = [
    {
        name: 'Transaction',
        path: '/dashboard',
        role: ['admin', 'cashier'],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="sidebar-menu"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                />
            </svg>
        ),
    },
    {
        name: 'Menu',
        path: '/dashboard/menu',
        role: ['admin', 'cashier'],
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="sidebar-menu"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
            </svg>
        ),
    },
    {
        name: 'Report',
        role: ['admin', 'cashier'],
        path: '/dashboard/report',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="sidebar-menu"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                />
            </svg>
        ),
    },
    {
        name: 'Users',
        role: ['admin'],
        path: '/dashboard/users',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="sidebar-menu"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
            </svg>
        ),
    },
];

const Sidebar = () => {
    const { mutate } = useLogout();
    const navigate = useNavigate();
    const location = useLocation();
    const { roles } = useUserStore((state) => state.user);

    const logout = () => {
        mutate();
    };
    return (
        <div className="w-20 ml-[2vh] bg-orange-400 h-full rounded-lg">
            <div className="flex flex-col items-center mt-8">
                <div className="w-12 h-12 bg-white/90 rounded-full p-2 flex justify-center items-center">
                    <img
                        src="/buyit-logo.png"
                        alt="buyit logo"
                        className="inline-block object-fill bg-cover w-6 h-8"
                    />
                </div>
                <div className="mt-6 flex flex-col gap-4">
                    {sidebarLinks
                        .filter((item) =>
                            roles.some((role) => item.role.includes(role))
                        )
                        .map((item, index) => {
                            const active = item.path === location.pathname;
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-1"
                                    onClick={() => navigate(item.path)}
                                >
                                    <span
                                        className={`${
                                            active && 'bg-orange-600/60'
                                        } rounded-lg`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span className="text-white text-xs">
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                </div>
                <div
                    className="mt-8 flex flex-col items-center gap-1 cursor-pointer"
                    onClick={logout}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="sidebar-menu"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </svg>
                    <span className="text-white text-xs">Sign Out</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
