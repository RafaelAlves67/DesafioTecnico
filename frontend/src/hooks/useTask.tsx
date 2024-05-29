import { api } from "../config/api";
import { Task } from "../types/Task";

// pegando token do localStorage para fazer requisição com as rotas protegidas
const token = localStorage.getItem(`token`)

export default function useTasks(){

    // FUNÇÃO PARA LISTAR TODAS AS TAREFAS
    async function getTasks() {
        const res = await fetch(`${api}/getTasks`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    }

    // FUNÇÃO PARA FILTRAR TAREFAS PELO TITULO
    async function getTasksByTitle(title: string){
        const res = await fetch(`${api}/search/${title}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    }

    // FUNÇÃO PARA ADICIONAR TAREFA
    async function addTask(title: string, description: string, status: string){
        const res = await fetch(`${api}/registerTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({title, description, status})
        })

        const data = await res.json()
        return data
    }

    // FUNÇÃO PARA EDITAR AS TAREFAS
    async function editTask(taskEdit: Task){
        const res = await fetch(`${api}/editTask/${taskEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(taskEdit)
        })

        const data = await res.json()
        return data
    }

    // FUNÇÃO PARA DELETAR TAREFAS
    async function deleteTask(id: number){
        const res = await fetch(`${api}/deleteTask/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()
        return data
    }

    return {getTasks, getTasksByTitle, addTask, editTask, deleteTask}
}