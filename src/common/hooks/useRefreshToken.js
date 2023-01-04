import useUserStore from '../../store/userStore';
import { axiosPrivate } from '../../api/axios';

const useRefreshToken = () => {
    const setUser = useUserStore((state) => state.setUser);

    const refresh = async () => {
        console.log('refresh token');
        const response = await axiosPrivate.get('/auth/refresh', {
            withCredentials: true,
        });

        setUser({
            username: response.data.username,
            userId: response.data.userId,
            accessToken: response.data.accessToken,
            roles: response.data.roles,
        });

        return response.data.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
