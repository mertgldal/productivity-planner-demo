// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore'; // Updated to ../../src to reach src from (auth) folder
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const loginUser = useAuthStore((state) => state.login);
    // const router = useRouter(); // No need here because routing is handled in RootLayout

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter your email and password.');
            return;
        }
        setLoading(true);
        const success = await loginUser(email, password);
        setLoading(false);
        if (success) {
            // Successful login redirection will be handled by RootLayout
            // You can add additional actions here if needed (e.g., analytics).
        } else {
            Alert.alert('Login Failed', 'Incorrect email or password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Your Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Your Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <FontAwesome name="sign-in" size={20} color="white" />
                        <Text style={styles.buttonText}>Login</Text>
                    </>
                )}
            </Pressable>

            <Link href="/(auth)/register" asChild>
                <Pressable style={styles.linkButton}>
                    <Text style={styles.linkText}>Don’t have an account? Register</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f2f5' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#1A202C' },
    input: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', fontSize: 16, marginBottom: 15 },
    button: { backgroundColor: '#007AFF', paddingVertical: 15, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 17, fontWeight: '600', marginLeft: 10 },
    linkButton: { marginTop: 20, alignItems: 'center' },
    linkText: { color: '#007AFF', fontSize: 15 },
});
