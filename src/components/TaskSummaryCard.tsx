// src/components/TaskSummaryCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Task } from '../types';
import { useTaskStore } from '../store/useTaskStore'; // Store'dan yolu düzelttik

interface TaskSummaryCardProps {
    task: Task;
}

export function TaskSummaryCard({ task }: TaskSummaryCardProps) {
    const toggleTask = useTaskStore((state) => state.toggleTask);

    return (
        <View style={styles.card}>
            <Pressable onPress={() => toggleTask(task.id)} style={styles.checkbox}>
                {task.is_completed && <View style={styles.checkboxInner} />}
            </Pressable>
            <View style={styles.textContainer}>
                <Text style={[styles.title, task.is_completed && styles.completedTitle]}>
                    {task.title}
                </Text>
                {task.due_date && (
                    <Text style={styles.dueDate}>
                        Bitiş: {new Date(task.due_date).toLocaleDateString('tr-TR')}
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12, // Daire şeklinde
        borderWidth: 2,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#007AFF',
        borderRadius: 6,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#8e8e93',
    },
    dueDate: {
        fontSize: 12,
        color: '#8e8e93',
        marginTop: 4,
    },
});