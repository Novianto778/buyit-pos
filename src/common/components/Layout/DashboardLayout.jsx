import Sidebar from './Sidebar';
import Navbar from './Navbar';
import OrderSidebar from '../../../features/dashboard/OrderSidebar';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
    const { pathname } = useLocation();
    const isDashboard = pathname === '/dashboard';
    return (
        <div className="flex w-screen h-screen bg-gray-100">
            <div className="flex h-[96vh] w-full place-self-center">
                <Sidebar />
                <div className="flex-1 px-4 relative">
                    <div className="grid grid-cols-12 gap-x-4 h-full">
                        <div
                            className={`${
                                isDashboard
                                    ? 'col-span-6 lg:col-span-8'
                                    : 'col-span-12'
                            } flex flex-col`}
                        >
                            <Navbar />
                            <div className="mt-4 overflow-y-auto h-full max-h-dashboard">
                                <Outlet />
                            </div>
                        </div>
                        {isDashboard && <OrderSidebar />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
