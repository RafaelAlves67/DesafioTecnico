export enum TaskStatus {
    Pendente = 'Pendente',
    EmProgresso = 'Em progresso',
    Concluida = 'Concluída'
}

export type Task = {
    id: number,
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
};
