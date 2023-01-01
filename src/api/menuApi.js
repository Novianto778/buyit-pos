import useAxiosPrivate from '../common/hooks/useAxiosPrivate';

const useMenuAPI = () => {
    const axiosPrivate = useAxiosPrivate();

    const getMenu = async () => {
        try {
            const { data } = await axiosPrivate.get('/products');
            return data;
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    const getMenuById = async ({ queryKey }) => {
        const [, id] = queryKey;
        try {
            const { data } = await axiosPrivate.get(`/products?id=${id}`);
            return data;
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    const addMenu = async (menu) => {
        try {
            const res = await axiosPrivate.post('/products', menu, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    const updateMenu = async (menu) => {
        try {
            const res = await axiosPrivate.patch(`/products`, menu, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    const getCategories = async () => {
        try {
            const { data } = await axiosPrivate.get('/products/categories');
            return data;
        } catch (error) {
            throw new Error(error?.response?.data?.message);
        }
    };

    return { getMenu, getMenuById, updateMenu, addMenu, getCategories };
};

export default useMenuAPI;
