import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/components/Button';
import DashboardLayout from '../common/components/Layout/DashboardLayout';
import UserList from '../features/users/UserList';

const User = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl">Kelola User</h1>
                <Button variant="primary" onClick={() => navigate('add')}>
                    Tambah
                </Button>
            </div>
            <UserList />
        </>
    );
};

export default User;
