import styles from './modalTask.module.css'
import { useState } from 'react'
import useTasks from '../../hooks/useTask'
import { Task } from '../../types/Task'

// tipando meus estados que estão vindo nas props
type Props = {
    setModalTask: React.Dispatch<React.SetStateAction<boolean>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
}

const modalTask = ({ setModalTask, setTasks }: Props) => {


    // pegando funções do hook de tarefa
    const { addTask } = useTasks()

    // função para fechar painel de cadastro de tarefa
    const handleEditCancel = () => {
        setModalTask(false)
    }

    // estados dos campos das tarefas
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')


    // estado para msg de erro
    const [msg, setMsg] = useState('')

    // função para cadastro de tarefas
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = await addTask(title, description, status)
        setMsg(data.msg)

        if (data.statusCode === 200) {
            setTasks((prevTasks) => [...prevTasks, data.newTask])
            setTitle('')
            setDescription('')
            setStatus('')
            setTimeout(() => {
                setModalTask(false)
            }, 1500)
        }
    }



    return (

        <div className={styles.modal_register}>
            <h1>Nova tarefa</h1>

            <strong>Preencha os campos abaixos</strong>

            <form className={styles.form}>
                <label>Título</label>
                <input type="text" placeholder='Nova tarefa...' onChange={(e) => setTitle(e.target.value)} />

                <label>Descrição</label>
                <textarea className={styles.textarea} onChange={(e) => setDescription(e.target.value)} />

                <label>Status</label>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                    <option selected value='Pendente'>Pendente</option>
                    <option value="Em progresso">Em progresso</option>
                    <option value="Concluída">Concluída</option>
                </select>


                <div className={styles.div_btn_register}>
                    <button className='btn btn-success' onClick={handleSubmit}>Cadastrar</button>
                    <button className="btn btn-danger" onClick={handleEditCancel}>Cancelar</button>
                </div>

                {msg === 'Tarefa criada!' && <p className={styles.p_sucess}>{msg}</p>}
                {msg !== 'Tarefa criada!' && msg.length > 0 && <p className={styles.p_error}>{msg}</p>}
            </form>
        </div>

    )
}

export default modalTask