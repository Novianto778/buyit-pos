import { useQuery } from '@tanstack/react-query';
import useOrderAPI from 'api/orderApi';

const queryKeys = {
    all: ['orders'],
    orders: ({ page, limit }) => ['orders', { page, limit }],
    detail: (id) => [...queryKeys.orders, id],
};

// export const useOrders = (params) => {
//     return useQuery(queryKeys.orders(params), useOrderAPI().getOrders, {
//         keepPreviousData: true,
//     });
// };

export const useOrders = () => {
    return useQuery(queryKeys.all, useOrderAPI().getOrders);
};
