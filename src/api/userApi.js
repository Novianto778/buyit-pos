import useAxiosPrivate from '../common/hooks/useAxiosPrivate';

const useUserApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getUser = async () => {
        try {
            const { data } = await axiosPrivate.get('/users');
            return data;
        } catch (error) {
            return error;
        }
    };

    const getUserById = async ({ queryKey }) => {
        const [, id] = queryKey;
        try {
            const { data } = await axiosPrivate.get(`/users?id=${id}`);
            return data;
        } catch (error) {
            return error;
        }
    };

    const addUser = async (user) => {
        try {
            const res = await axiosPrivate.post('/users', user);
            console.log(res);

            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error) {
            return error;
        }
    };

    const updateUser = async (user) => {
        try {
            const res = await axiosPrivate.patch('/users', user);
            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await axiosPrivate.delete(`/users`, {
                data: { id },
            });

            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    return { getUser, getUserById, addUser, updateUser, deleteUser };
};

export default useUserApi;
