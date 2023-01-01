import create from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderStore = create(
    persist(
        (set) => ({
            orders: [],
            addOrder: (order) =>
                set((state) => {
                    // add order and check if order already exists add 1 to quantity
                    const orderExists = state.orders.find(
                        (o) => o.id === order.id
                    );
                    if (orderExists) {
                        orderExists.quantity += 1;
                        return { orders: [...state.orders] };
                    }
                    return {
                        orders: [...state.orders, { ...order, quantity: 1 }],
                    };
                }),
            incrementOrder: (id) =>
                set((state) => {
                    const orderExists = state.orders.find((o) => o.id === id);
                    if (orderExists) {
                        orderExists.quantity += 1;
                        return { orders: [...state.orders] };
                    }
                }),
            decrementOrder: (id) =>
                set((state) => {
                    const orderExists = state.orders.find((o) => o.id === id);
                    if (orderExists) {
                        orderExists.quantity -= 1;

                        if (orderExists.quantity === 0) {
                            return {
                                orders: state.orders.filter((o) => o.id !== id),
                            };
                        }
                        return { orders: [...state.orders] };
                    }
                }),
            clearOrders: () => set({ orders: [], paymentTotal: 0 }),
            paymentTotal: 0,
            addPaymentTotal: (total) =>
                set((state) => ({
                    paymentTotal: parseFloat(state.paymentTotal) + total,
                })),
            setPaymentTotal: (paymentTotal) =>
                set((state) => ({ paymentTotal })),
        }),
        {
            name: 'order-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useOrderStore;
