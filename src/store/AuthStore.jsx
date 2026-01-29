import { create } from 'zustand';

const useAuth = create((set) => ({
    auth: false,
    setAuth: ((status) => set({ auth: status })),
}));

export default useAuth;