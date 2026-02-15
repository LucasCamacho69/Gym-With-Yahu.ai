import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { api } from "../services/api";

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	setAuth: (user: User, token: string) => void;
	signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,

			setAuth: (user: User, token: string) => {
				api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				set({ user, token });
			},
			signOut: () => {
				api.defaults.headers.common["Authorization"] = "";
				set({ user: null, token: null });
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
