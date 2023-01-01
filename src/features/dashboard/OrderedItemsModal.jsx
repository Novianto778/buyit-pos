import { useForm } from 'react-hook-form';
import { formatPrice } from '../../helpers/formatPrice';
import useOrderStore from '../../store/useOrderStore';
import useModalStore from '../../store/modalStore';
import { useCreateOrder } from './queries';

const OrderedItemsModal = () => {
    const orders = useOrderStore((state) => state.orders);
    const paymentTotal = useOrderStore((state) => state.paymentTotal);
    const total = orders.reduce((acc, order) => {
        return acc + order.price * order.quantity;
    }, 0);
    const clearOrders = useOrderStore((state) => state.clearOrders);
    const setIsModalOpen = useModalStore((state) => state.setIsModalOpen);
    const { mutate } = useCreateOrder();

    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let date = new Date();
    let dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    let timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };

    let dateString = new Intl.DateTimeFormat('id-ID', dateOptions).format(date);
    let timeString = new Intl.DateTimeFormat('id-ID', timeOptions).format(date);

    const onSubmit = (data) => {
        console.log(orders);

        const newData = {
            ...data,
            products: orders.map((order) => {
                return {
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    productId: order.id,
                };
            }),
            totalPrice: total,
        };

        mutate(newData, {
            onSuccess: () => {
                clearOrders();
                onCloseModal();
            },
        });
    };

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 z-50 h-screen w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"
        >
            <div className="relative w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative bg-white rounded-lg shadow"
                >
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Ordered Items
                        </h3>
                        <button
                            onClick={onCloseModal}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="staticModal"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="px-6 py-2">
                        <div className="grid grid-cols-6 items-center mt-2">
                            <div className="col-span-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Customer Name
                                </label>
                            </div>
                            <input
                                {...register('customerName', {
                                    required: 'Customer Name is required',
                                })}
                                id="name"
                                placeholder="John Doe"
                                className="text-field col-span-4 text-sm px-3 py-1 font-semibold"
                            />
                        </div>
                        {errors.customerName && (
                            <p className="text-red-500 text-sm">
                                {errors.customerName.message}
                            </p>
                        )}
                        <div className="grid grid-cols-12 mt-4 border-b pb-2">
                            <p className="col-span-6 text-sm text-gray-500 font-medium">
                                No: ORD-BI-1323198434
                            </p>
                            <p className="col-span-6 text-sm text-gray-500 font-medium text-right">
                                Date: {dateString} {timeString}
                            </p>
                        </div>

                        <div className="grid grid-cols-12 gap-x-4 mt-4 border-b pb-2">
                            <h6 className="col-span-1 font-semibold text-sm">
                                #
                            </h6>
                            <h6 className="col-span-5 font-semibold text-sm">
                                Item
                            </h6>
                            <h6 className="col-span-2 font-semibold text-sm text-center">
                                Qty
                            </h6>
                            <h6 className="col-span-4 font-semibold text-sm text-right pr-4">
                                Subtotal
                            </h6>
                        </div>
                        <div className="border-b pb-4 flex flex-col gap-y-2 max-h-[200px] overflow-y-auto pr-4">
                            {orders.map((order, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-12 gap-x-4 mt-4 items-center"
                                >
                                    <h6 className="col-span-1 text-gray-600 font-medium">
                                        {index + 1}
                                    </h6>
                                    <div className="col-span-5">
                                        <h6 className="text-gray-600 font-semibold text-sm">
                                            {order.name}
                                        </h6>
                                        <p className="text-gray-600 font-medium text-xs">
                                            {formatPrice(order.price)}
                                        </p>
                                    </div>
                                    <h6 className="col-span-2 text-gray-600 font-medium text-sm text-center">
                                        {order.quantity}
                                    </h6>
                                    <h6 className="col-span-4 text-gray-600 font-medium text-sm text-right">
                                        {formatPrice(
                                            order.price * order.quantity
                                        )}
                                    </h6>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-6 border-b pb-4">
                        <div className="grid grid-cols-12 mt-4 items-center">
                            <h6 className="col-span-6 text-gray-700 font-medium uppercase">
                                Total
                            </h6>
                            <p className="col-span-6 text-lg text-gray-700 font-medium text-right">
                                {formatPrice(total)}
                            </p>
                        </div>
                        <div className="grid grid-cols-12 items-center">
                            <h6 className="col-span-6 text-gray-700 font-medium uppercase">
                                Pay Amount
                            </h6>
                            <p className="col-span-6 text-gray-700 font-medium text-right">
                                {formatPrice(paymentTotal)}
                            </p>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <div className="grid grid-cols-12 items-center">
                            <h6 className="col-span-6 text-gray-700 font-medium uppercase">
                                Change
                            </h6>
                            <p className="col-span-6 text-gray-700 font-medium text-right">
                                {formatPrice(paymentTotal - total)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button
                            data-modal-toggle="staticModal"
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            Accept Order
                        </button>
                        <button
                            onClick={onCloseModal}
                            data-modal-toggle="staticModal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10"
                        >
                            Cancel Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderedItemsModal;
