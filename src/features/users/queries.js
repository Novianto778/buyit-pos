import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useUserApi from '../../api/userApi';

const queryKeys = {
    all: ['user'],
    detail: (id) => [...queryKeys.all, id],
};

export const useUsers = () => {
    const { getUser } = useUserApi();
    return useQuery(queryKeys.all, getUser, {
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUserById = (id) => {
    const { getUserById } = useUserApi();
    return useQuery(queryKeys.detail(id), getUserById, {
        enabled: !!id,
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useAddUser = () => {
    const { addUser } = useUserApi();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(addUser, {
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
                navigate('/dashboard/users');
                return queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};

export const useUpdateUser = () => {
    const { updateUser } = useUserApi();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(updateUser, {
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
                navigate('/dashboard/users');
                return queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};

export const useDeleteUser = () => {
    const { deleteUser } = useUserApi();
    const queryClient = useQueryClient();
    return useMutation(deleteUser, {
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data) {
                toast.success(data.message);
                return queryClient.invalidateQueries(queryKeys.all);
            }
        },
    });
};
