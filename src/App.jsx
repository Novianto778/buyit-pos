import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import PrivateRoutes from './common/components/PrivateRoutes';
import User from './pages/User';
import Dashboard from './pages/Dashboard';
import './index.css';
import Loading from './common/components/Loading';
import useUIStore from './store/uiStore';
import useUserStore from './store/userStore';
import PersistLogin from './common/components/PersistLogin';
import NotFound from './pages/404';
import AddUser from './features/users/AddUser';
import DashboardLayout from './common/components/Layout/DashboardLayout';
import AddProduct from './features/products/AddProduct';
import Menu from './pages/Menu';
import Orders from 'pages/Orders';
import Receipt from 'features/orders/Receipt';

const ROLES = {
    ADMIN: 'admin',
    CASHIER: 'cashier',
};

function App() {
    const isLoading = useUIStore((state) => state.isLoading);
    const user = useUserStore((state) => state.user);
    // console.log(user);

    return (
        <>
            {isLoading && <Loading />}
            <Toaster />
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route
                        path="/"
                        element={
                            <PrivateRoutes
                                allowedRoles={[ROLES.ADMIN, ROLES.CASHIER]}
                            />
                        }
                    >
                        <Route index element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} />
                            {/* <Route path="users">
                                <Route index element={<User />} />
                                <Route path="add" element={<AddUser />} />
                                <Route
                                    path="edit/:id"
                                    element={<AddUser isEdit />}
                                />
                            </Route> */}
                            <Route path="menu">
                                <Route index element={<Menu />} />
                                <Route path="add" element={<AddProduct />} />
                                <Route
                                    path="edit/:id"
                                    element={<AddProduct isEdit />}
                                />
                            </Route>
                            <Route path="report">
                                <Route index element={<Orders />} />
                                <Route path="receipt" element={<Receipt />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route
                        path="/"
                        element={<PrivateRoutes allowedRoles={[ROLES.ADMIN]} />}
                    >
                        <Route index element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="users">
                                <Route index element={<User />} />
                                <Route path="add" element={<AddUser />} />
                                <Route
                                    path="edit/:id"
                                    element={<AddUser isEdit />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
