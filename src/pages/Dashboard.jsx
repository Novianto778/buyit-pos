import React from 'react';
import useUserStore from '../store/userStore';
import ProductCard from '../features/products/ProductCard';
import { useProducts } from '../features/products/queries';
import useLoading from '../common/hooks/useLoading';
import OrderedItemsModal from '../features/dashboard/OrderedItemsModal';
import ModalContainer from '../common/components/ModalContainer';

const Dashboard = () => {
    const user = useUserStore((state) => state.user);

    const { data, isLoading } = useProducts();

    useLoading(isLoading);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-4 max-h-dashboard">
            {data?.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
            <ModalContainer>
                <OrderedItemsModal />
            </ModalContainer>
        </div>
    );
};

export default Dashboard;
