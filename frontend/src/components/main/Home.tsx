import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../Context/Context"
import { Link } from "react-router-dom"
import styles from './home.module.css'
import { IoAdd } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import useTasks from "../../hooks/useTask"
import { Task } from "../../types/Task";
import "./home.module.css"


// components
import Table from "../tableTask/table"
import ModalTask from "../modalTask/modalTask"

const Home = () => {

  // chamando as funções que vou utilizar do meu hook useTasks
  const { getTasks } = useTasks()

  // chamando o estado de authenticate que está no context para verificar se o usuário está logado ou não
  const { authenticate } = useContext(Context)

  // usando navigate
  const Navigate = useNavigate()

  // estados das tarefas e titulo para pesquisa
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')


  // estados para painel de cadastro de tarefa
  const [modalTask, setModalTask] = useState(false)

  // useEffect para ler as tarefas gravadas no banco de dados
  useEffect(() => {
    const getDataTasks = async () => {
      const data = await getTasks()
      setTasks(data)
    }

    getDataTasks()
  }, [])

  // função para busca de dados
  const handleClickSearch = async () => {
    Navigate(`/search?q=${title}`)
    setTitle('')

  }

  // função para abrir painel de cadastro de tarefa
  const openModalRegister = () => {
    setModalTask(true)
  }


  return (
    <div>
      {/* checkando se o usuário está logado */}
      {authenticate
        ?

        // SE O USUÁRIO ESTIVER AUTENTICADO
        <>

          {/* DIV GERAL - HOME */}
          <div className={styles.home}>

            {/* DIV LISTA DE TAREFA E BOTÃO PARA NOVA TAREFA */}
            <div className={styles.div_title_btn}>
              <h2>Lista de tarefas</h2>

              <button className={styles.bg_dark} onClick={openModalRegister}><IoAdd className={styles.icon} />Nova tarefa</button>
            </div>

            {/* DIV DE FILTRAGEM E BUSCA */}
            <div className={styles.div_search}>

              {/* CAMPO DE BUSCA PELO TITULO */}
              <div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Pesquise pelo título" aria-label="Example text with button addon" aria-describedby="button-addon1" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={handleClickSearch}><FaSearch className={styles.iconSearch} /></button>
                </div>
              </div>
            </div>

            {/* DIV DAS TAREFAS CRIADAS */}
            <div className={styles.div_table}>
              <Table tasks={tasks} setTasks={setTasks} />
            </div>

            {/* CAMPO DE CADASTRO DE TAREFAS  */}
            {modalTask && <ModalTask setModalTask={setModalTask} setTasks={setTasks} />}

          </div>
        </>
        :

        // SE O USUARIO NÃO ESTIVER AUTENTICADO = 
        <>
          <div className={styles.div_acessBlocked}>
            <h1>Acesso negado!</h1>

            <div>
              <Link to="/login">Fazer login</Link>
              <Link to="/register">Crie sua conta</Link>
            </div>
          </div>
        </>}
    </div>
  )
}

export default Home