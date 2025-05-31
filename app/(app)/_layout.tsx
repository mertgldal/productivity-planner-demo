// app/(app)/_layout.tsx
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthStore } from "../../src/store/useAuthStore"; // src klasörüne göre yol

export default function AppLayout() {
    const logoutUser = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logoutUser();
        // Yönlendirme RootLayout tarafından yapılacak
        // router.replace('/(auth)/login');
    };

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "SmartPlan AI",
                    headerLargeTitle: true,
                    headerRight: () => (
                        <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
                            <FontAwesome name="sign-out" size={24} color="#007AFF" />
                        </Pressable>
                    )
                }}
            />
            <Stack.Screen name="tasks" options={{ title: "Tüm Görevler", presentation: 'modal' }} />
            <Stack.Screen name="createTask" options={{ title: "Yeni Görev Ekle", presentation: 'modal' }} />
        </Stack>
    );
}