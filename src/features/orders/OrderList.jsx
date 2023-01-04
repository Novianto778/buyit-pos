import Table from 'common/components/Table/Table';
import { SelectColumnFilter } from 'common/components/Table/Table';
import useLoading from 'common/hooks/useLoading';
import React, { useCallback, useMemo, useRef } from 'react';
import { useOrders } from './queries';
import Receipt from './Receipt';
import ReactToPrint from 'react-to-print';
import { useExportExcel } from './hooks/useExportExcel';
import { useProducts } from 'features/products/queries';
import Button from 'common/components/Button';

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    }
);

const OrderList = () => {
    const { data, isLoading } = useOrders();
    const { exportExcel } = useExportExcel();
    const { data: products } = useProducts();

    const productsOptions = useMemo(
        () =>
            products?.map((product) => ({
                value: product.name,
                label: product.name,
            })) || [],
        [products]
    );
    const componentRef = useRef();
    const columns = useMemo(
        () => [
            {
                id: 'selection',
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllPageRowsSelectedProps }) => (
                    <div>
                        <IndeterminateCheckbox
                            {...getToggleAllPageRowsSelectedProps()}
                        />
                    </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (
                    <div>
                        <IndeterminateCheckbox
                            {...row.getToggleRowSelectedProps()}
                        />
                    </div>
                ),
            },

            {
                Header: 'NO',
                accessor: 'no',
            },
            {
                Header: 'Customer Name',
                accessor: 'customerName',
            },
            {
                Header: 'Product Name',
                accessor: (row) =>
                    row.products.map((product) => product.name).join(', '),
                show: false,
                Filter: SelectColumnFilter,
                filterOpt: productsOptions,
            },
            {
                Header: 'Total Price',
                accessor: 'totalPrice',
            },
            {
                Header: 'Order Date',
                accessor: 'createdAt',
                Cell: ({ row }) => {
                    return (
                        <span className="text-xs font-medium">
                            {new Date(row.original.createdAt).toLocaleString(
                                'id-ID',
                                {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }
                            )}
                        </span>
                    );
                },
            },
            {
                Header: 'Cashier',
                accessor: 'user.username',
                Filter: SelectColumnFilter,
            },
            {
                // Build our expander column
                id: 'expander', // Make sure it has an ID
                Header: ({
                    getToggleAllRowsExpandedProps,
                    // isAllRowsExpanded,
                }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                        {/* {isAllRowsExpanded ? '👇' : '👉'} */}
                        Action
                    </span>
                ),
                Cell: (props) => {
                    const { row } = props;
                    const ref = useRef(row.original);

                    return (
                        // Use Cell to render an expander for each row.
                        // We can use the getToggleRowExpandedProps prop-getter
                        // to build the expander.
                        <div className="flex gap-x-2">
                            <span
                                {...row.getToggleRowExpandedProps()}
                                className="text-sm font-medium"
                            >
                                {row.original.products.length > 0
                                    ? row.isExpanded
                                        ? '👇'
                                        : '👉'
                                    : 'No Product'}
                            </span>
                            <ReactToPrint
                                trigger={() => (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 cursor-pointer"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                        />
                                    </svg>
                                )}
                                content={() => ref.current}
                            />
                            <div style={{ display: 'none' }}>
                                <Receipt
                                    data={[row.original] || []}
                                    ref={ref}
                                />
                            </div>
                        </div>
                    );
                },
            },
        ],
        [productsOptions]
    );
    const renderRowSubComponent = React.useCallback(({ row }) => {
        return (
            <Table
                data={row.original.products}
                columns={[
                    {
                        Header: 'Product Name',
                        accessor: 'name',
                        Cell: ({ values }) => {
                            return <span className="text-xs">{values}</span>;
                        },
                    },
                    {
                        Header: 'Price',
                        accessor: 'price',
                        Cell: ({ values }) => {
                            return <span className="text-xs">{values}</span>;
                        },
                    },
                    {
                        Header: 'Quantity',
                        accessor: 'quantity',
                        Cell: ({ values }) => {
                            return <span className="text-xs text-center">{values}</span>;
                        },
                    },
                    {
                        Header: 'Subtotal',
                        accessor: 'subtotal',
                        Cell: ({ row }) => {
                            return (
                                <span className="text-xs">
                                    {row.original.price * row.original.quantity}
                                </span>
                            );
                        },
                    },
                ]}
                isSub
            />
        );
    }, []);

    const renderTableFooter = useCallback((data) => {
        const row = data.map((item) => item.original);

        return (
            <>
                <ReactToPrint
                    trigger={() => (
                        <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md">
                            Print Selected
                        </button>
                    )}
                    content={() => componentRef.current}
                />
                <div style={{ display: 'none' }}>
                    <Receipt data={row || []} ref={componentRef} />
                </div>
            </>
        );
    }, []);

    useLoading(isLoading);

    if (isLoading) return <div>Loading...</div>;
    if (!data.orders) return <div>There is no data</div>;

    return (
        <>
            <div className="flex justify-end">
                <Button
                    className="bg-green-600 text-white"
                    onClick={() => exportExcel(data?.orders)}
                >
                    Export Excel
                </Button>
            </div>
            <Table
                data={data?.orders || []}
                columns={columns}
                renderRowSubComponent={renderRowSubComponent}
                renderTableFooter={renderTableFooter}
            />
        </>
    );
};

export default OrderList;
