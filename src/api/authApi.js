import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../common/hooks/useAxiosPrivate';

const useAuthApi = () => {
    const axiosPrivate = useAxiosPrivate();
    const login = async ({ username, password }) => {
        try {
            const { data } = await axiosPrivate.post(
                '/auth',
                { username, password },
                {
                    withCredentials: true,
                }
            );

            return data;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return null;
        }
    };

    const logout = async () => {
        try {
            const { data } = await axiosPrivate.post('/auth/logout');
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message);
            return null;
        }
    };

    return { login, logout };
};

export default useAuthApi;
