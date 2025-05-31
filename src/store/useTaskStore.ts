// src/store/useTaskStore.ts
import { create } from 'zustand';
import type { Task } from '../types';

// Başlangıç için sahte görevler
const initialTasks: Task[] = [
    { id: '1', title: 'Expo projesini incele', is_completed: false, deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() }, // Yarın
    { id: '2', title: 'Alışveriş yap', is_completed: true, deadline: null }, // Deadline olmayan görev
    { id: '3', title: 'Yapay zeka planlayıcı özelliklerini düşün', is_completed: false }, // Bu da deadline'sız olsun veya eklenebilir
];

interface TaskState {
    tasks: Task[];
    aiSuggestion: string | null;
    addTask: (title: string, deadline?: string | null) => void; // Parametreler güncellendi
    toggleTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: initialTasks,
    aiSuggestion: "Bugün Expo Router ile harika bir başlangıç yapabilirsin!",
    addTask: (title, deadline) => // Parametreler güncellendi
        set((state) => ({
            tasks: [
                // Yeni görevleri başa eklemek daha yaygındır, ama senin örneğinde sona eklenmişti.
                // Ben de senin örneğindeki gibi sona ekliyorum.
                ...state.tasks,
                {
                    id: Math.random().toString(36).substring(2, 9), // Basit bir ID üretimi
                    title,
                    is_completed: false,
                    deadline: deadline || null, // Deadline yoksa null ata
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