export interface Task {
    id: string;
    title: string;
    is_completed: boolean;
    deadline?: string | null;
    priority?: number; // 1 en yüksek öncelik, opsiyonel
}
