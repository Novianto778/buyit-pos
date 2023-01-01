import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from '../../store/userStore';

const PrivateRoutes = ({ allowedRoles }) => {
    const user = useUserStore((state) => state.user);

    const isAuthenticated = user?.roles?.some((role) =>
        allowedRoles.includes(role)
    );
    const location = useLocation();

    return (
        <>
            {isAuthenticated ? (
                <Outlet />
            ) : user ? (
                <Navigate to="404" />
            ) : (
                <Navigate
                    to={{ pathname: '/login', state: { from: location } }}
                    replace
                />
            )}
        </>
    );
};

export default PrivateRoutes;
