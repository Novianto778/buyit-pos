import {
    useExpanded,
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from 'react-table';
import {
    SortIcon,
    SortUpIcon,
    SortDownIcon,
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from './Icons';
import { Button, PageButton } from './Button';
import ReactSelect from 'react-select';
import React, { useMemo } from 'react';
import GlobalFilter from './GlobalFilter';

export function SelectColumnFilter({ column }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const { filterOpt, filterValue, setFilter, preFilteredRows, id, render } =
        column;

    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    const opt =
        filterOpt ||
        options.map((option, i) => ({
            value: option,
            label: option,
        }));

    // Render a multi-select box
    return (
        <label className="grid grid-cols-12 gap-x-2 items-center mt-4">
            <span className="text-gray-700 text-sm col-span-4">
                {render('Header')}:
            </span>
            <ReactSelect
                className="min-w-[180px] w-full max-w-[320px] col-span-8 rounded-md text-sm border-gray-600 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                onChange={(e) => {
                    setFilter(e.value || undefined);
                }}
                placeholder="All"
                defaultValue={{
                    value: filterValue ? filterValue : '',
                    label: filterValue ? filterValue : 'All',
                }}
                options={[{ value: '', label: 'All' }, ...opt]}
            />
        </label>
    );
}

function Table({
    columns,
    data,
    renderRowSubComponent = null,
    isSub,
    renderTableFooter,
    manualPagination,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        visibleColumns,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            manualPagination,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect
    );

    // Render the UI for your table

    return (
        <>
            <div className="sm:flex flex-col sm:gap-x-2">
                {!isSub && (
                    <div className="flex items-center justify-between">
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between">
                    {headerGroups?.map((headerGroup) =>
                        headerGroup.headers?.map((column) => {
                            return column.Filter ? (
                                <div className="mt-2 sm:mt-0" key={column.id}>
                                    {column.render('Filter')}
                                </div>
                            ) : null;
                        })
                    )}
                </div>
            </div>
            {/* table */}
            <div className={`${!isSub && 'mt-4'} flex flex-col`}>
                <div className="overflow-x-auto ">
                    <div className="py-2 align-middle inline-block min-w-full">
                        <div
                            className={`overflow-hidden sm:rounded-lg ${
                                !isSub && 'border-b border-gray-200'
                            }`}
                        >
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="bg-gray-50">
                                    {headerGroups?.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers
                                                .filter(
                                                    (col) => col.show !== false
                                                )
                                                ?.map((column) => (
                                                    // Add the sorting props to control sorting. For this example
                                                    // we can add them into the header props
                                                    <th
                                                        scope="col"
                                                        className={`group ${
                                                            !isSub
                                                                ? 'px-4 py-3'
                                                                : 'px-2 py-1 text-[10px]'
                                                        } text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            {column.render(
                                                                'Header'
                                                            )}
                                                            {/* Add a sort direction indicator */}
                                                            <span>
                                                                {column.isSorted ? (
                                                                    column.isSortedDesc ? (
                                                                        <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                    ) : (
                                                                        <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                    )
                                                                ) : (
                                                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </th>
                                                ))}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white"
                                >
                                    {page?.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <React.Fragment key={i}>
                                                <tr
                                                    {...row.getRowProps()}
                                                    className={
                                                        i % 2 === 0 && !isSub
                                                            ? 'bg-gray-100'
                                                            : ''
                                                    }
                                                >
                                                    {row.cells?.map((cell) => {
                                                        if (
                                                            cell.column.show ===
                                                            false
                                                        ) {
                                                            return null;
                                                        }
                                                        if (
                                                            cell.column.id ===
                                                            'no'
                                                        ) {
                                                            return (
                                                                <td
                                                                    className="px-6 py-4 whitespace-nowrap"
                                                                    key={i}
                                                                >
                                                                    <div className="text-sm text-gray-900">
                                                                        {state.pageIndex *
                                                                            state.pageSize +
                                                                            i +
                                                                            1}
                                                                    </div>
                                                                </td>
                                                            );
                                                        }
                                                        return (
                                                            <td
                                                                {...cell.getCellProps()}
                                                                className={`${
                                                                    !isSub
                                                                        ? 'px-4 py-2'
                                                                        : 'px-2 py-1'
                                                                }  whitespace-nowrap`}
                                                                role="cell"
                                                            >
                                                                {cell.column
                                                                    .Cell
                                                                    .name ===
                                                                'defaultRenderer' ? (
                                                                    <div
                                                                        className={`${
                                                                            !isSub
                                                                                ? 'text-sm'
                                                                                : 'text-xs'
                                                                        } text-gray-700`}
                                                                    >
                                                                        {cell.render(
                                                                            'Cell'
                                                                        )}{' '}
                                                                        {
                                                                            cell
                                                                                .column
                                                                                ?.postFix
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    cell.render(
                                                                        'Cell'
                                                                    )
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                                {row.isExpanded ? (
                                                    <tr>
                                                        <td
                                                            colSpan={
                                                                visibleColumns.length
                                                            }
                                                        >
                                                            {renderRowSubComponent(
                                                                { row }
                                                            )}
                                                        </td>
                                                    </tr>
                                                ) : null}
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            {(pageCount > 1 || state.pageSize > 10) && (
                <div className="py-3 flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <Button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            Next
                        </Button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="flex gap-x-2 items-baseline">
                            <span className="text-sm text-gray-700">
                                Page{' '}
                                <span className="font-medium">
                                    {state.pageIndex + 1}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {pageOptions.length}
                                </span>
                            </span>
                            <label>
                                <span className="sr-only">Items Per Page</span>
                                <ReactSelect
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={(e) => {
                                        setPageSize(Number(e.value));
                                    }}
                                    value={[
                                        {
                                            value: 5,
                                            label: '5',
                                        },
                                        {
                                            value: 10,
                                            label: '10',
                                        },
                                        {
                                            value: 20,
                                            label: '20',
                                        },
                                    ].find((e) => e.value === state.pageSize)}
                                    menuPosition="fixed"
                                    options={[
                                        {
                                            value: 5,
                                            label: '5',
                                        },
                                        {
                                            value: 10,
                                            label: '10',
                                        },
                                        {
                                            value: 20,
                                            label: '20',
                                        },
                                        {
                                            value: data.length,
                                            label: 'Show All',
                                        },
                                    ]}
                                />
                            </label>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination"
                            >
                                <PageButton
                                    className="rounded-l-md"
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                                >
                                    <span className="sr-only">First</span>
                                    <ChevronDoubleLeftIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                                <PageButton
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeftIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                                <PageButton
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRightIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                                <PageButton
                                    className="rounded-r-md"
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                                >
                                    <span className="sr-only">Last</span>
                                    <ChevronDoubleRightIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </PageButton>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
            {/* check if there is selected row */}
            {selectedFlatRows.length > 0 && renderTableFooter(selectedFlatRows)}
            {/* renderTabLe Footer */}
        </>
    );
}

export default Table;
