import create from 'zustand';

const useModalStore = create((set) => ({
    isModalOpen: false,
    setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
}));

export default useModalStore;