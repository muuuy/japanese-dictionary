import { create } from "zustand";

interface UserState {
  auth: boolean;
  authUser: () => void;
  unAuthUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  auth: false,
  authUser: () => set({ auth: true }),
  unAuthUser: () => set({ auth: false }),
}));

export default useUserStore;
