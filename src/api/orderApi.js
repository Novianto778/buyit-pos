import useAxiosPrivate from '../common/hooks/useAxiosPrivate';

const useOrderAPI = () => {
    const axiosPrivate = useAxiosPrivate();

    const getOrders = async () => {
        try {
            const { data } = await axiosPrivate.get('/orders');
            return data;
        } catch (error) {
            return error;
        }
    };

    const createOrder = async (order) => {
        try {
            const res = await axiosPrivate.post('/orders', order);
            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return { getOrders, createOrder };
};

export default useOrderAPI;
