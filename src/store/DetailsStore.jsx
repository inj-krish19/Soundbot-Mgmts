import { create } from "zustand";

const details = create((set) => ({
    nickname: '....',
    setNickname: ((nickname) => set({ nickname }))
}));

export default details;