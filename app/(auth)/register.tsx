// app/(auth)/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore'; // ../../src olarak güncelledim
import { FontAwesome } from '@expo/vector-icons';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const registerUser = useAuthStore((state) => state.register);
    // const router = useRouter(); // Yönlendirme RootLayout'ta olduğu için burada gerek yok

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }
        setLoading(true);
        const success = await registerUser(email, password);
        setLoading(false);
        if (success) {
            // Başarılı kayıt sonrası yönlendirme RootLayout tarafından yapılacak
        } else {
            Alert.alert('Kayıt Başarısız', 'Bir sorun oluştu, lütfen tekrar deneyin.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hesap Oluştur</Text>
            <TextInput
                style={styles.input}
                placeholder="E-posta Adresiniz"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Şifreniz"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <FontAwesome name="user-plus" size={20} color="white" />
                        <Text style={styles.buttonText}>Kayıt Ol</Text>
                    </>
                )}
            </Pressable>

            <Link href="/(auth)/login" asChild>
                <Pressable style={styles.linkButton}>
                    <Text style={styles.linkText}>Zaten hesabınız var mı? Giriş Yapın</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f2f5' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#1A202C' },
    input: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', fontSize: 16, marginBottom: 15 },
    button: { backgroundColor: '#34C759', paddingVertical: 15, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 17, fontWeight: '600', marginLeft: 10 },
    linkButton: { marginTop: 20, alignItems: 'center' },
    linkText: { color: '#007AFF', fontSize: 15 },
});