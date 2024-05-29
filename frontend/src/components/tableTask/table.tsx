import { Task } from "../../types/Task";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import styles from './table.module.css';
import { useState } from "react";
import ModalEdit from "../modalEdit/modalEdit";
import useTasks from "../../hooks/useTask";
import { format } from 'date-fns'

type Props = {
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const Table = ({ tasks, setTasks }: Props) => {

  // importando funções do hook
  const { deleteTask, editTask } = useTasks();

  // declarando os estados para painel de edição 
  const [modalEdit, setModalEdit] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  // função para abrir painel de edição
  const handleOpenModalEdit = (id: number) => {
    setModalEdit(true);
    const task = tasks.find(task => task.id === id);
    setEditedTask(task || null);
  };

  // função para fechar painel de edição
  const handleCloseModelEdit = () => {
    setModalEdit(false);
    setEditedTask(null);
  };

  // função para salvar edição
  const handleSaveEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!editedTask) {
      return;
    }

    const { id, title, description, status } = editedTask;
    const taskEdit: Task = { id, title, description, status, createdAt: editedTask.createdAt, updatedAt: new Date().toISOString() };
    const data = await editTask(taskEdit);

    if (data.statusCode === 200) {
      setTasks((prevTasks) => prevTasks.map(task => task.id === id ? taskEdit : task));
      setModalEdit(false);
    }
  };

  // função para deletar tarefa
  const handleDelete = async (id: number) => {
    const data = await deleteTask(id);

    if (data.statusCode === 200) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  };

  // função para pegar o valor dos estados
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editedTask) {
      setEditedTask(prevState => ({ ...prevState!, [name]: value }));
    }
  };

  // função para formatação de datas para leitura mais facil
  const formatDate = (dateString: string) => {
    // Verificar se a data está no formato correto (YYYY-MM-DD)
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
      return ''; // Retorna uma string vazia se a data estiver em formato inválido
    }

    const [yearStr, monthStr, dayStr] = dateParts;
    const year = parseInt(yearStr, 10); // Converte para número base 10
    const month = parseInt(monthStr, 10) - 1; // Converte para número base 10 e subtrai 1 do mês
    const day = parseInt(dayStr, 10); // Converte para número base 10

    const formattedDate = format(new Date(year, month, day), 'dd/MM/yyyy');
    return formattedDate;
  }

  return (
    <table className="table table-dark table-striped text-center">
      <thead>
        <tr>
          <th scope="col">Título</th>
          <th scope="col">Descrição</th>
          <th scope="col">Status</th>
          <th scope="col">Data de criação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td className={styles.width_description}>{task.description}</td>
            <td>{task.status}</td>
            <td>{formatDate(task.createdAt)}</td>
            <td>
              <button className={styles.btn_edit} onClick={() => handleOpenModalEdit(task.id)}><RiEditBoxFill /> Edit</button>
              <button onClick={() => handleDelete(task.id)} className={styles.btn_delete}><MdDelete /> Delete</button>
            </td>
          </tr>
        ))}
      </tbody>

      {modalEdit && (
        <ModalEdit
          editedTask={editedTask}
          handleCloseModelEdit={handleCloseModelEdit}
          handleChange={handleChange}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </table>
  );
}

export default Table;
