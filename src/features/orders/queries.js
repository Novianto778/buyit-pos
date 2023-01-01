import { useQuery } from '@tanstack/react-query';
import useOrderAPI from 'api/orderApi';

const queryKeys = {
    orders: ['orders'],
    detail: (id) => [...queryKeys.orders, id],
};

export const useOrders = () => {
    return useQuery(queryKeys.orders, useOrderAPI().getOrders);
}

