import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useOrderAPI from '../../api/orderApi';

const queryKeys = {
    orders: ['orders'],
};

export const useCreateOrder = () => {
    const { createOrder } = useOrderAPI();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(createOrder, {
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
                queryClient.invalidateQueries(queryKeys.orders);
                navigate('/dashboard');
            }
        },
    });
};
