// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore'; // ../../src olarak güncelledim, (auth) klasöründen çıkıp src'ye ulaşmak için
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const loginUser = useAuthStore((state) => state.login);
    // const router = useRouter(); // router.replace yönlendirmesi RootLayout'ta olduğu için burada gerek yok

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
            return;
        }
        setLoading(true);
        const success = await loginUser(email, password);
        setLoading(false);
        if (success) {
            // Başarılı giriş sonrası yönlendirme RootLayout tarafından yapılacak
            // Eğer burada ek bir işlem yapmak isterseniz (örn: analytics) yapabilirsiniz.
        } else {
            Alert.alert('Giriş Başarısız', 'E-posta veya şifre hatalı.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>

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

            <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <FontAwesome name="sign-in" size={20} color="white" />
                        <Text style={styles.buttonText}>Giriş Yap</Text>
                    </>
                )}
            </Pressable>

            <Link href="/(auth)/register" asChild>
                <Pressable style={styles.linkButton}>
                    <Text style={styles.linkText}>Hesabınız yok mu? Kayıt Olun</Text>
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