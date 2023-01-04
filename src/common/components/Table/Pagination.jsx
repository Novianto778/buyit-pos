import React from 'react';
import ReactSelect from 'react-select';
import { PageButton } from './Button';
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from './Icons';

const Pagination = ({ data, state, setState }) => {
    const gotoPage = (page) => {
        setState((prevState) => ({
            ...prevState,
            page,
        }));
    };

    const previousPage = () => {
        gotoPage(state.page - 1);
    };

    const nextPage = () => {
        gotoPage(state.page + 1);
    };

    const canPreviousPage = state.page > 1;
    const canNextPage = state.page < state.pages;

    return (
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-x-2 items-baseline">
                <span className="text-sm text-gray-700">
                    Page{' '}
                    <span className="font-medium">{state.page}</span>{' '}
                    of <span className="font-medium">{state.pages}</span>
                </span>
                <label>
                    <span className="sr-only">Items Per Page</span>
                    <ReactSelect
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) => {
                            setState((prevState) => ({
                                ...prevState,
                                limit: e.value,
                            }));
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
                        ].find((e) => e.value === state.limit)}
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
                                value: data?.total,
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
                        onClick={() => gotoPage(data?.pages - 1)}
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
    );
};

export default Pagination;
