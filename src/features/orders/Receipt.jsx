import axios from 'api/axios';
import { formatPrice } from 'helpers/formatPrice';
import React, { forwardRef, useRef } from 'react';

const ReceiptItem = ({ product }) => {
    return (
        <div className="grid grid-cols-12">
            <div className="flex items-center gap-x-6 col-span-6">
                <img
                    src={`${axios.defaults.baseURL}/files/${product.productId.image}`}
                    alt=""
                    className="w-20 h-20"
                />
                <div className="flex flex-col">
                    <h6 className="text-base font-semibold">{product.name}</h6>
                    {/* <p className="text-sm font-medium text-gray-500">Pizza</p> */}
                    <p className="text-xs font-medium text-gray-500">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </div>
            <div className="col-span-3">
                <h6 className="font-semibold text-sm text-gray-500 mt-3">
                    Qty: {product.quantity}
                </h6>
            </div>
            <div className="col-span-3">
                <h6 className="font-semibold text-sm mt-3">
                    {formatPrice(product.price * product.quantity)}
                </h6>
            </div>
        </div>
    );
};

const ReceiptContent = ({ item }) => {
    const { user, products, customerName, totalPrice, createdAt } = item;

    return (
        <div className="px-8 py-4 bg-white h-screen">
            <div className="py-4 border-b-2 flex items-center justify-between">
                <h1 className="font-bold text-2xl tracking-widest">BuyIT</h1>
                <div>
                    <h6 className="font-semibold text-gray-500">
                        Cashier Name
                    </h6>
                    <p className="text-sm font-medium uppercase">
                        {user?.username}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-12 py-4 border-b-2">
                <div className="col-span-6">
                    <h6 className="font-semibold text-gray-500">Date</h6>
                    <p className="text-sm font-medium">
                        {new Date(createdAt).toLocaleString('id-ID', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </p>
                </div>
                <div className="col-span-3">
                    <h6 className="font-semibold text-gray-500">Order No</h6>
                    <p className="text-sm font-medium">{item._id}</p>
                </div>
                <div className="col-span-3">
                    <h6 className="font-semibold text-gray-500">
                        Customer Name
                    </h6>
                    <p className="text-sm font-medium uppercase">
                        {customerName}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 py-6 border-b-2">
                {products.map((product) => (
                    <ReceiptItem key={product._id} product={product} />
                ))}
            </div>
            <div className="py-6">
                <div className="grid grid-cols-12">
                    <div className="col-span-6"></div>
                    <div className="col-span-3">
                        <h6 className="font-semibold text-sm text-gray-500 mt-3">
                            Subtotal:
                        </h6>
                    </div>
                    <div className="col-span-3">
                        <h6 className="font-semibold text-sm text-gray-500 mt-3">
                            {formatPrice(totalPrice)}
                        </h6>
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-6"></div>
                    <div className="col-span-3">
                        <h6 className="font-semibold text-sm text-gray-500">
                            Discount:
                        </h6>
                    </div>
                    <div className="col-span-3">
                        <h6 className="font-semibold text-sm text-gray-500">
                            {formatPrice(0)}
                        </h6>
                    </div>
                </div>
                <div className="grid grid-cols-12 mt-4">
                    <div className="col-span-6"></div>
                    <div className="col-span-3">
                        <h6 className="font-semibold">Total:</h6>
                    </div>
                    <div className="col-span-3">
                        <h6 className="font-semibold">
                            {formatPrice(totalPrice)}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Receipt = forwardRef((props, ref) => {
    const receiptRef = useRef(null);
    const exportPDF = () => {
        receiptRef.current.save();
    };
    return (
        <>
            {/* export button */}
            <div className="absolute top-20 right-10">
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded flex items-center gap-x-2"
                    onClick={exportPDF}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                    </svg>
                    <span className="text-sm">Export</span>
                </button>
            </div>
            <div ref={ref}>
                {props.data.map((item) => {
                    return (
                        <div key={item._id}>
                            <ReceiptContent item={item} />
                        </div>
                    );
                })}
            </div>
        </>
    );
});

export default Receipt;
