import Burger from '../../assets/img/beef-burger.png';
import React, { memo } from 'react';
import { formatPrice } from '../../helpers/formatPrice';
import useOrderStore from '../../store/useOrderStore';
import axios from 'api/axios';

const OrderedItemsCard = ({ id, name, price, quantity, image }) => {
    // const { id, name, price, quantity } = order;
    const incrementOrder = useOrderStore((state) => state.incrementOrder);
    const decrementOrder = useOrderStore((state) => state.decrementOrder);
    // console.log(order);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-gray-100 p-2 rounded">
            <div className="flex items-center gap-x-2">
                <img
                    src={axios.defaults.baseURL + `files/${image}`}
                    alt="burger"
                    className="w-12 h-12 rounded"
                />
                <div className="flex flex-col">
                    <h6 className="font-medium text-sm leading-4">{name}</h6>
                    <h6 className="font-medium text-gray-700 text-sm">
                        {formatPrice(price)}
                    </h6>
                </div>
            </div>
            {/* increment and decrement */}
            <div className="flex items-center gap-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 bg-gray-200 p-1 select-none cursor-pointer"
                    onClick={() => decrementOrder(id)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                    />
                </svg>
                <h6 className="font-medium text-base px-4 py-2 bg-white select-none">
                    {quantity}
                </h6>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 bg-gray-200 p-1 select-none cursor-pointer"
                    onClick={() => incrementOrder(id)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                    />
                </svg>
            </div>
        </div>
    );
};

export default memo(OrderedItemsCard);
