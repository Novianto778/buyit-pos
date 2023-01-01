import { useEffect } from 'react';
import useUIStore from '../../store/uiStore';

const useLoading = (isLoading) => {
    const setIsLoading = useUIStore((state) => state.setIsLoading);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading, setIsLoading]);

    return isLoading;
};

export default useLoading;
