import React from 'react';
import useLoading from '../../common/hooks/useLoading';
import { useDeleteUser, useUsers } from './queries';
import { useMemo } from 'react';
import Table, { SelectColumnFilter } from '../../common/components/Table/Table';
import { Link } from 'react-router-dom';
import Button from 'common/components/Button';

const UserList = () => {
    const { data, isLoading } = useUsers();
    const { mutate: deleteUser } = useDeleteUser();

    const columns = useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Role',
                accessor: (row) => row.roles.join(' - '),
                Filter: SelectColumnFilter,
                filterOpt: [
                    { value: 'admin', label: 'Admin' },
                    { value: 'cashier', label: 'Cashier' },
                ],
            },
            {
                Header: 'Status',
                accessor: (row) => (row.active ? 'Aktif' : 'Inactive'),
                Filter: SelectColumnFilter,
                Cell: ({ value }) => {
                    const isActive = value === 'Aktif';
                    return (
                        <span
                            className={`${
                                isActive ? 'bg-green-500' : 'bg-red-600'
                            } rounded-full text-xs font-medium text-white px-4 py-1`}
                        >
                            {isActive ? 'Aktif' : 'Inactive'}
                        </span>
                    );
                },
            },
            {
                Header: 'Aksi',
                accessor: 'aksi',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <div className="flex items-center gap-x-4">
                                <Link to={`edit/${row.original._id}`}>
                                    <Button className="px-4 py-1.5">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    className="px-4 py-1.5"
                                    onClick={() => deleteUser(row.original._id)}
                                >
                                    Hapus
                                </Button>
                            </div>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const loading = useLoading(isLoading);
    if (loading) return null;
    return (
        <>
            <Table data={data || []} columns={columns} />
        </>
    );
};

export default UserList;
