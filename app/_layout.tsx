// app/_layout.tsx
import React, { useEffect } from 'react';
import { useAuthStore } from '../src/store/useAuthStore';
import { Slot, useRouter, SplashScreen } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const setLoading = useAuthStore((state) => state.setLoading);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(false);
        };
        checkAuth();
    }, [setLoading]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (isAuthenticated) {
            // (app) grubunun index dosyasına yönlendirme
            router.replace('/(app)'); // VEYA '/(app)/' veya '/(app)/index' deneyebilirsiniz.
            // Expo Router genellikle '(app)' yazdığınızda (app)/index.tsx'i bulur.
        } else {
            // (auth) grubunun login dosyasına yönlendirme
            router.replace('/(auth)/login'); // VEYA '/(auth)/login'
        }
        SplashScreen.hideAsync();
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Slot />;
}