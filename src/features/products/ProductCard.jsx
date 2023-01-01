import React, { memo } from 'react';
import { formatPrice } from '../../helpers/formatPrice';
import useOrderStore from '../../store/useOrderStore';
import shallow from 'zustand/shallow';
import axios from 'api/axios';

const ProductCard = ({ product }) => {
    const { _id: id, name, price, image, categories } = product;
    const { addOrder } = useOrderStore(
        (state) => ({
            addOrder: state.addOrder,
        }),
        shallow
    );

    return (
        <div className="flex flex-col relative bg-white rounded-xl overflow-hidden shadow-sm border-[1px]">
            <img
                src={`${axios.defaults.baseURL}files/${image}`}
                alt=""
                className="w-full h-full bg-cover place-self-center"
            />
            <div className="px-4 pb-4">
                <h6 className="font-semibold text-base leading-5">{name}</h6>
                <p className="text-gray-500 text-sm font-medium">
                    {categories.join(', ')}
                </p>
                <h6 className="font-medium text-gray-800">
                    {formatPrice(price)}
                </h6>
            </div>
            <div className="absolute bottom-2 right-2 cursor-pointer">
                <button
                    className="bg-orange-400 text-white rounded-full p-2"
                    onClick={() =>
                        addOrder({
                            id,
                            name,
                            price,
                            image,
                        })
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
