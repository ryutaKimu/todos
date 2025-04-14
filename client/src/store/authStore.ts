import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
	isAuthenticated: boolean;
	setAuthenticated: (auth: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			setAuthenticated: (auth) => set({ isAuthenticated: auth }),
		}),
		{
			name: "auth-storage",
		}
	)
);
