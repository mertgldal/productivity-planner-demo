// src/store/useTaskStore.ts
import { create } from 'zustand';
import type { Task } from '../types';

// Fake tasks for initial state
const initialTasks: Task[] = [
    { id: '1', title: 'Review Expo project', is_completed: false, deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() }, // Tomorrow
    { id: '2', title: 'Go shopping', is_completed: true, deadline: null }, // Task without deadline
    { id: '3', title: 'Think about AI planner features', is_completed: false }, // Also no deadline or can be added
];

interface TaskState {
    tasks: Task[];
    aiSuggestion: string | null;
    addTask: (title: string, deadline?: string | null) => void; // Updated parameters
    toggleTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: initialTasks,
    aiSuggestion: "You can have a great start with Expo Router today!",
    addTask: (title, deadline) =>
        set((state) => ({
            tasks: [
                // Usually new tasks are added at the beginning, but here added to the end like your example
                ...state.tasks,
                {
                    id: Math.random().toString(36).substring(2, 9), // Simple ID generation
                    title,
                    is_completed: false,
                    deadline: deadline || null, // Assign null if no deadline
                },
            ],
        })),
    toggleTask: (taskId) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, is_completed: !task.is_completed } : task
            ),
        })),
}));
