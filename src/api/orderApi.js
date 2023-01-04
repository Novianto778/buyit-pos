import useAxiosPrivate from '../common/hooks/useAxiosPrivate';

const useOrderAPI = () => {
    const axiosPrivate = useAxiosPrivate();

    const getOrders = async () => {
        // with page and limit
        // const { page = 1, limit = 10 } = queryKey[1];
        // const url = `/orders?page=${page}&limit=${limit}`;

        // without page and limit
        const url = '/orders';

        try {
            const res = await axiosPrivate.get(url);
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    const createOrder = async (order) => {
        try {
            const res = await axiosPrivate.post('/orders', order);
            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    return { getOrders, createOrder };
};

export default useOrderAPI;
