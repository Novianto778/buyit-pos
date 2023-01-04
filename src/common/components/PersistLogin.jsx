import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useUserStore from '../../store/userStore';
import useLoading from '../hooks/useLoading';

const PersistLogin = () => {
    const user = useUserStore((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();

    useLoading(isLoading);

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => (isMounted = false);
    }, []);

    // kalo tidak persist maka langsung akan ke outlet tanpa jalanin useEffect(maka gk ada cek refresh)
    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
