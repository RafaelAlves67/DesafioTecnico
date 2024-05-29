import styles from './modalEdit.module.css';
import { Task } from '../../types/Task';

// tipando minha props que está vindo 
type Props = {
  handleCloseModelEdit: () => void;
  editedTask: Task | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSaveEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ModalEdit = ({ handleCloseModelEdit, editedTask, handleChange, handleSaveEdit }: Props) => {
  return (
    <div className={styles.modal_edit}>
      <h1>Editar tarefa</h1>
      <form className={styles.form}>
        <label>Título</label>
        <input type="text" placeholder='Nova tarefa...' name="title" value={editedTask?.title || ''} onChange={handleChange} />

        <label>Descrição</label>
        <textarea className={styles.textarea} name="description" value={editedTask?.description || ''} onChange={handleChange} />

        <label>Status</label>
       

        <select className="form-select" aria-label="Default select example" id={styles.select_status} name="status" value={editedTask?.status || ''} onChange={handleChange}>
              <option selected value='Pendente'>Pendente</option>
                    <option value="Em progresso">Em progresso</option>
                    <option value="Concluída">Concluída</option> 
        </select>

        <div className={styles.div_btn_register}>
          <button type="button" className='btn btn-success' onClick={handleSaveEdit}>Editar</button>
          <button type="button" className="btn btn-danger" onClick={handleCloseModelEdit}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalEdit;
