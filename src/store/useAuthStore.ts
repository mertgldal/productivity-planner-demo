// src/store/useAuthStore.ts
import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    // İleride name, token gibi alanlar eklenebilir
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean; // Sayfa ilk açıldığında durumu kontrol etmek için
    login: (email: string, pass: string) => Promise<boolean>;
    register: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    setLoading: (loading: boolean) => void; // Yüklenme durumunu ayarlamak için
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false, // Başlangıçta kullanıcı giriş yapmamış
    user: null,
    isLoading: true, // Başlangıçta yükleniyor

    login: async (email, password) => {
        // GERÇEK UYGULAMADA: Burada backend'inize API çağrısı yapın
        console.log("Login attempt:", email, password); // Simülasyon
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) { // Çok basit bir kontrol
                    set({ isAuthenticated: true, user: { id: 'mock-user-id-123', email: email }, isLoading: false });
                    resolve(true);
                } else {
                    set({ isLoading: false });
                    resolve(false);
                }
            }, 1000); // 1 saniye gecikme simülasyonu
        });
    },

    register: async (email, password) => {
        // GERÇEK UYGULAMADA: Burada backend'inize API çağrısı yapın
        console.log("Register attempt:", email, password); // Simülasyon
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) { // Çok basit bir kontrol
                    // Kayıttan sonra otomatik giriş yapılıyor gibi davranalım
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
        // GERÇEK UYGULAMADA: Gerekirse backend'e token geçersizleştirme çağrısı yapın
        set({ isAuthenticated: false, user: null, isLoading: false });
        console.log("User logged out");
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    }
}));