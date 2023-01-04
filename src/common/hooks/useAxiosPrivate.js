import { axiosPrivate } from '../../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useUserStore from '../../store/userStore';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            async (config) => {
                // console.log('request interceptor');
                config.withCredentials = true;
                if (!config.headers['Authorization']) {
                    config.headers.Authorization = `Bearer ${user?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;
                console.log(prevRequest);

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log('nACT', newAccessToken);
                    prevRequest.headers = {
                        ...prevRequest.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    };
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refresh, user]);

    return axiosPrivate;
};

export default useAxiosPrivate;
