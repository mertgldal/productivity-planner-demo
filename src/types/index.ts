// src/types/index.ts
export interface Task {
    id: string;
    title: string;
    is_completed: boolean;
    deadline?: string | null; // ISO formatında tarih, opsiyonel ve null olabilir
}