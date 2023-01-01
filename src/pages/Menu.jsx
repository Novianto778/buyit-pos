import Table from 'common/components/Table/Table';
import { SelectColumnFilter } from 'common/components/Table/Table';
import { formatPrice } from 'helpers/formatPrice';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from 'store/userStore';
import Button from 'common/components/Button';
import useLoading from 'common/hooks/useLoading';
import { useProductAndCategories } from 'features/products/queries';
import axios from 'api/axios';

const Menu = () => {
    const { roles } = useUserStore((state) => state.user);
    const isValidRole = roles.includes('admin');

    const [product, categories] = useProductAndCategories();
    const isLoading = product.isLoading || categories.isLoading;

    const categoriesOpt = useMemo(
        () =>
            categories.data?.map((category) => ({
                value: category,
                label: category,
            })) || [],
        [categories.data]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'NO',
                accessor: 'no',
            },
            {
                Header: 'Image',
                accessor: 'image',
                Cell: ({ value }) => (
                    <div>
                        <img
                            src={`${axios.defaults.baseURL}files/${value}`}
                            alt=""
                            className="w-12 h-12 object-cover"
                        />
                    </div>
                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
                Cell: ({ value }) => (
                    <h6 className="font-semibold text-sm">{value}</h6>
                ),
            },
            {
                Header: 'Price',
                accessor: 'price',
                Cell: ({ value }) => (
                    <h6 className="font-semibold text-sm">
                        {formatPrice(value)}
                    </h6>
                ),
            },
            {
                Header: 'Categories',
                accessor: (row) => row.categories.join(' - ') || 'No Category',
                Cell: ({ value }) => (
                    <h6 className="font-semibold text-sm capitalize">
                        {value}
                    </h6>
                ),
                Filter: SelectColumnFilter,
                filterOpt: categoriesOpt,
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    <>
                        {isValidRole ? (
                            <div className="flex items-center space-x-2">
                                <Link to={`edit/${row.original._id}`}>
                                    <Button variant="primary">Edit</Button>
                                </Link>

                                <Button variant="danger">Delete</Button>
                            </div>
                        ) : (
                            <h6 className="text-xs font-semibold">
                                No Action Allowed!
                            </h6>
                        )}
                    </>
                ),
            },
        ],
        [isValidRole, categoriesOpt]
    );

    useLoading(isLoading);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Menu</h1>
                {isValidRole && (
                    <Link to="add">
                        <Button variant="primary">Add</Button>
                    </Link>
                )}
            </div>
            <Table data={product?.data || []} columns={columns} />
        </>
    );
};

export default Menu;
