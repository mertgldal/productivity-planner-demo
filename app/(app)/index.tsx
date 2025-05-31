import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, Pressable, Modal, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useTaskStore } from "../../src/store/useTaskStore";
import { TaskSummaryCard } from "../../src/components/TaskSummaryCard";
import { FontAwesome } from '@expo/vector-icons';

export default function IndexScreen() {
    const tasks = useTaskStore((state) => state.tasks);
    const aiSuggestion = useTaskStore((state) => state.aiSuggestion);
    const [modalVisible, setModalVisible] = useState(false);

    // Filter incomplete tasks and sort by priority (assuming priority ranges from 1 to 5, with 1 being highest)
    const displayedTasks = tasks
        .filter(task => !task.is_completed)
        .sort((a, b) => (a.priority ?? Infinity) - (b.priority ?? Infinity))
        .slice(0, 3);

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedTasks}
                renderItem={({ item }) => <TaskSummaryCard task={item} />}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View style={styles.headerWrapper}>
                        <Text style={styles.headerTitle}>SmartPlan AI</Text>

                        {aiSuggestion && (
                            <View style={styles.suggestionContainer}>
                                <Text style={styles.suggestionText}>💡 {aiSuggestion}</Text>
                                <Pressable
                                    onPress={() => setModalVisible(true)}
                                    style={styles.infoIcon}
                                    accessibilityRole="button"
                                    accessibilityLabel="Information about the AI suggestion"
                                >
                                    <FontAwesome name="question-circle" size={18} color="#0056b3" />
                                </Pressable>
                            </View>
                        )}

                        <Text style={styles.sectionTitle}>Priority Tasks</Text>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyTasksText}>
                        No priority tasks to complete! 🎉
                    </Text>
                }
                contentContainerStyle={styles.scrollContentContainer}
            />

            <View style={styles.buttonsWrapper}>
                <Link href="/tasks" asChild>
                    <Pressable style={styles.buttonBlue} accessibilityRole="button">
                        <FontAwesome name="list-ul" size={20} color="white" />
                        <Text style={styles.buttonText}>View All Tasks</Text>
                    </Pressable>
                </Link>

                <Link href="/createTask" asChild>
                    <Pressable style={styles.buttonGreen} accessibilityRole="button">
                        <FontAwesome name="plus" size={20} color="white" />
                        <Text style={styles.buttonText}>Add New Task</Text>
                    </Pressable>
                </Link>
            </View>

            {/* Modal for AI suggestion explanation */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Why is this AI suggestion shown?</Text>
                        <Text style={styles.modalText}>
                            This suggestion is based on an analysis of your current priority tasks.
                            Our recommendations take into account task priority, deadlines, and your past task completion speed.
                        </Text>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </TouchableOpacity>
            </Modal>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    suggestionText: {
        fontSize: 16,
        color: '#0056b3',
        fontStyle: 'italic',
        flex: 1,
    },
    infoIcon: {
        marginLeft: 10,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        maxWidth: 400,
        width: '100%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 25,
        color: '#444',
    },
    closeButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
