import {
    useQuery,
    useMutation,
    useQueryClient,
    useQueries,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useMenuAPI from '../../api/menuApi';

const queryKeys = {
    products: ['products'],
    categories: () => [...queryKeys.products, 'categories'],
    detail: (id) => [...queryKeys.products, id],
};

export const useProducts = () => {
    return useQuery(queryKeys.products, useMenuAPI().getMenu);
};

export const useProductById = (id) => {
    return useQuery(queryKeys.detail(id), useMenuAPI().getMenuById, {
        enabled: !!id,
    });
};

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMenuAPI().addMenu, {
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
                queryClient.invalidateQueries(queryKeys.products);
                navigate('/dashboard/menu');
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(useMenuAPI().updateMenu, {
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
                queryClient.invalidateQueries(queryKeys.products);
                navigate('/dashboard/menu');
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useCategories = () => {
    return useQuery(queryKeys.categories(), useMenuAPI().getCategories);
};

export const useProductAndCategories = () => {
    return useQueries({
        queries: [
            {
                queryKey: queryKeys.products,
                queryFn: useMenuAPI().getMenu,
            },
            {
                queryKey: queryKeys.categories(),
                queryFn: useMenuAPI().getCategories,
            },
        ],
    });
};
