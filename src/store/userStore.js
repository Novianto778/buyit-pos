// zustand user store
import create from 'zustand';

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ ...state.user, user })),
}));

export default useUserStore;
