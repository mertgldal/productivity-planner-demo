// app/createTask.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTaskStore } from '../../src/store/useTaskStore';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function CreateTaskScreen() {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState<Date | undefined>(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const addTask = useTaskStore((state) => state.addTask);
    const router = useRouter();

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios');
        if (event.type === "set" && selectedDate) {
            setDeadline(selectedDate);
        } else if (event.type === "dismissed") {
            setShowPicker(false);
        }
    };

    const handleAddTask = () => {
        if (title.trim() === '') {
            Alert.alert('Error', 'Task title cannot be empty.');
            return;
        }

        const deadlineISO = deadline ? deadline.toISOString() : null;
        addTask(title, deadlineISO);

        Alert.alert('Success', 'Task added!', [
            { text: 'OK', onPress: () => router.back() },
        ]);
        setTitle('');
        setDeadline(new Date());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Task Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., Write project report"
                value={title}
                onChangeText={setTitle}
                autoCapitalize="sentences"
            />

            <Text style={styles.label}>Deadline:</Text>
            <Pressable onPress={() => setShowPicker(true)} style={styles.datePickerButtonContainer}>
                <View style={styles.datePickerButton}>
                    <FontAwesome name="calendar" size={20} color="#007AFF" style={styles.iconStyle} />
                    <Text style={styles.datePickerButtonText}>
                        {deadline ? deadline.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) : "Select Date"}
                    </Text>
                </View>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={deadline || new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <View style={styles.spacer} />

            <Pressable style={styles.button} onPress={handleAddTask}>
                <FontAwesome name="plus" size={20} color="white" />
                <Text style={styles.buttonText}>Add Task</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f2f5',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333333',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ced4da',
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    datePickerButtonContainer: {
        marginBottom: 25,
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ced4da',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    iconStyle: {
        marginRight: 10,
    },
    datePickerButtonText: {
        fontSize: 16,
        color: '#333333',
    },
    spacer: {
        flex: 1,
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
