import create from 'zustand';

const useUIStore = create((set) => ({
    isSidebarOpen: false,
    setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useUIStore;
