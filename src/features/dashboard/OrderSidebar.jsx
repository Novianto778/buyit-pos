import { toast } from 'react-hot-toast';
import Button from '../../common/components/Button';
import { formatPrice } from '../../helpers/formatPrice';
import useModalStore from '../../store/modalStore';
import useOrderStore from '../../store/useOrderStore';
import OrderedItemsCard from './OrderedItemsCard';

const OrderSidebar = () => {
    const orders = useOrderStore((state) => state.orders);
    const clearOrders = useOrderStore((state) => state.clearOrders);
    const paymentTotal = useOrderStore((state) => state.paymentTotal);
    const addPaymentTotal = useOrderStore((state) => state.addPaymentTotal);
    const setPaymentTotal = useOrderStore((state) => state.setPaymentTotal);
    const setIsModalOpen = useModalStore((state) => state.setIsModalOpen);

    const totalPrice = orders.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const clearCart = () => {
        clearOrders();
    };

    const handleProcessOrder = () => {
        if (!orders.length) {
            toast.error('No items in cart');
            return;
        }
        if (paymentTotal < totalPrice) {
            toast.error('Payment is not enough');
            return;
        }
        setIsModalOpen(true);
    };

    return (
        <div
            className={`col-span-6 lg:col-span-4 bg-white h-full p-4 overflow-y-auto `}
        >
            <div className="flex gap-x-2 items-center justify-between">
                <h6 className="font-medium text-lg">Ordered Items</h6>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={clearCart}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </div>
            <div className="mt-4 h-receipt">
                {/* product list container */}
                <div className="flex flex-col gap-y-2 h-full max-h-[50%] overflow-y-auto">
                    {orders.length ? (
                        orders.map((item) => {
                            return <OrderedItemsCard key={item.id} {...item} />;
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-16 h-16 text-gray-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                            <p className="text-gray-400 text-center mt-2">
                                No items ordered yet
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <div className="flex gap-x-2 items-center justify-between">
                        <h6 className="font-medium text-lg">Total Price</h6>
                        <p className="font-bold">{formatPrice(totalPrice)}</p>
                    </div>
                    <div className="bg-gray-100 mt-2 rounded p-4">
                        <div className="flex items-center justify-between">
                            <h6 className="font-medium text-lg">Cash</h6>
                            <input
                                type="text"
                                className="outline-non focus:outline-orange-300 px-2 py-1 text-sm"
                                value={paymentTotal || ''}
                                onChange={(e) =>
                                    setPaymentTotal(e.target.value)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <div
                                className="bg-white p-1 text-center rounded shadow text-sm font-medium text-gray-600 cursor-pointer hover:bg-orange-200 hover:font-bold duration-300"
                                onClick={() => addPaymentTotal(2000)}
                            >
                                + 2.000
                            </div>
                            <div
                                className="bg-white p-1 text-center rounded shadow text-sm font-medium text-gray-600 cursor-pointer hover:bg-orange-200 hover:font-bold duration-300"
                                onClick={() => addPaymentTotal(5000)}
                            >
                                + 5.000
                            </div>
                            <div
                                className="bg-white p-1 text-center rounded shadow text-sm font-medium text-gray-600 cursor-pointer hover:bg-orange-200 hover:font-bold duration-300"
                                onClick={() => addPaymentTotal(10000)}
                            >
                                + 10.000
                            </div>
                            <div
                                className="bg-white p-1 text-center rounded shadow text-sm font-medium text-gray-600 cursor-pointer hover:bg-orange-200 hover:font-bold duration-300"
                                onClick={() => addPaymentTotal(20000)}
                            >
                                + 20.000
                            </div>
                            <div
                                className="bg-white p-1 text-center rounded shadow text-sm font-medium text-gray-600 cursor-pointer hover:bg-orange-200 hover:font-bold duration-300"
                                onClick={() => addPaymentTotal(50000)}
                            >
                                + 50.000
                            </div>
                            <div
                                className="bg-white p-1 text-center rounded shadow text-sm font-medium text-gray-600 cursor-pointer hover:bg-orange-200 hover:font-bold duration-300"
                                onClick={() => addPaymentTotal(100000)}
                            >
                                + 100.000
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    variant="primary"
                    className="w-full mt-6"
                    onClick={handleProcessOrder}
                >
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default OrderSidebar;
