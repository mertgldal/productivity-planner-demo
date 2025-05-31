// app/tasks.tsx dosyasında
import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'; // Pressable eklendi
import { useTaskStore } from '../../src/store/useTaskStore';
import { TaskSummaryCard } from '../../src/components/TaskSummaryCard';
import { Link } from 'expo-router'; // Link import edildi
import { FontAwesome } from '@expo/vector-icons'; // FontAwesome import edildi

export default function TasksScreen() {
    const tasks = useTaskStore((state) => state.tasks);

    return (
        <View style={styles.container}>
            {tasks.length > 0 ? (
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => <TaskSummaryCard task={item} />}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 80 }} // Butonun üzerine gelmemesi için
                />
            ) : (
                <Text style={styles.emptyText}>Henüz hiç görev eklenmemiş.</Text>
            )}
            <Link href="/createTask" asChild>
                {/* (app) layout'u aktif olduğundan, '/createTask' -> '(app)/createTask' anlamına gelir */}
                <Pressable style={styles.addButton}>
                    <FontAwesome name="plus" size={20} color="white" />
                    <Text style={styles.addButtonText}>Yeni Görev Ekle</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#f7f7f7',
    },
    // EKSİK OLAN STİLİ BURAYA EKLEYİN:
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 18,
        color: 'gray',
    },
    addButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        position: 'absolute',
        bottom: 30,
        left: 60,
        right: 60,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});