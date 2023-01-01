import OrderList from 'features/orders/OrderList';
import React from 'react';

const Orders = () => {
    return (
        <>
            <h1 className="text-xl font-bold">Order History</h1>
            <div className="mt-4">
                <OrderList />
            </div>
        </>
    );
};

export default Orders;
