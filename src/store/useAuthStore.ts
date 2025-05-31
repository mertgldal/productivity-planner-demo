// src/store/useAuthStore.ts
import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    // Fields like name, token can be added later
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean; // To check the status when the page first loads
    login: (email: string, pass: string) => Promise<boolean>;
    register: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    setLoading: (loading: boolean) => void; // To set the loading status
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false, // Initially, the user is not logged in
    user: null,
    isLoading: true, // Initially loading

    login: async (email, password) => {
        // IN A REAL APP: Make an API call to your backend here
        console.log("Login attempt:", email, password); // Simulation
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) { // A very simple check
                    set({ isAuthenticated: true, user: { id: 'mock-user-id-123', email: email }, isLoading: false });
                    resolve(true);
                } else {
                    set({ isLoading: false });
                    resolve(false);
                }
            }, 1000); // Simulating 1 second delay
        });
    },

    register: async (email, password) => {
        // IN A REAL APP: Make an API call to your backend here
        console.log("Register attempt:", email, password); // Simulation
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) { // A very simple check
                    // Let's pretend the user is automatically logged in after registration
                    set({ isAuthenticated: true, user: { id: 'mock-user-id-456', email: email }, isLoading: false });
                    resolve(true);
                } else {
                    set({ isLoading: false });
                    resolve(false);
                }
            }, 1000);
        });
    },

    logout: () => {
        // IN A REAL APP: Optionally call backend to invalidate token
        set({ isAuthenticated: false, user: null, isLoading: false });
        console.log("User logged out");
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    }
}));
