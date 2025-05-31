import React from 'react';
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useTaskStore } from "../../src/store/useTaskStore";
import { TaskSummaryCard } from "../../src/components/TaskSummaryCard";
import { FontAwesome } from '@expo/vector-icons';

export default function IndexScreen() {
    const tasks = useTaskStore((state) => state.tasks);
    const aiSuggestion = useTaskStore((state) => state.aiSuggestion);

    const displayedTasks = tasks.filter(task => !task.is_completed).slice(0, 3);

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedTasks}
                renderItem={({ item }) => <TaskSummaryCard task={item} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.headerWrapper}>
                        <Text style={styles.headerTitle}>SmartPlan AI</Text>

                        {aiSuggestion && (
                            <View style={styles.suggestionContainer}>
                                <Text style={styles.suggestionText}>💡 {aiSuggestion}</Text>
                            </View>
                        )}

                        <Text style={styles.sectionTitle}>Öncelikli Görevler</Text>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyTasksText}>
                        Tamamlanacak öncelikli görev yok! 🎉
                    </Text>
                }
                contentContainerStyle={styles.scrollContentContainer}
            />

            <View style={styles.buttonsWrapper}>
                <Link href="/tasks" asChild>
                    {/* (app) layout'u aktif olduğundan, '/tasks' -> '(app)/tasks' anlamına gelir */}
                    <Pressable style={styles.buttonBlue}>
                        <FontAwesome name="list-ul" size={20} color="white" />
                        <Text style={styles.buttonText}>Tüm Görevleri Gör</Text>
                    </Pressable>
                </Link>

                <Link href="/createTask" asChild>
                    {/* (app) layout'u aktif olduğundan, '/createTask' -> '(app)/createTask' anlamına gelir */}
                    <Pressable style={styles.buttonGreen}>
                        <FontAwesome name="plus" size={20} color="white" />
                        <Text style={styles.buttonText}>Yeni Görev Ekle</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    scrollContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    headerWrapper: {
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#1c1c1e',
    },
    suggestionContainer: {
        backgroundColor: '#d6eaff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 25,
        borderLeftWidth: 5,
        borderLeftColor: '#007aff',
    },
    suggestionText: {
        fontSize: 16,
        color: '#0056b3',
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333333',
    },
    emptyTasksText: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: 16,
        color: '#555555',
    },
    buttonsWrapper: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        backgroundColor: '#f0f2f5',
        gap: 12,
    },
    buttonBlue: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonGreen: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
