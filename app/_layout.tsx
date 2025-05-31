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
            setLoading(false); // You might want to add real auth check here
        };
        checkAuth();
    }, [setLoading]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (isAuthenticated) {
            // Redirect to the index file inside the (app) group
            router.replace('/(app)'); // You can also try '/(app)/' or '/(app)/index'
            // Expo Router usually resolves '(app)' to '(app)/index.tsx'
        } else {
            // Redirect to the login file inside the (auth) group
            router.replace('/(auth)/login'); // Or just '/(auth)/login'
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
