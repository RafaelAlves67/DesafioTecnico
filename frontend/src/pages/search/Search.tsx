import { useSearchParams, Link } from "react-router-dom"
import { Task } from "../../types/Task"
import { useState, useEffect, useContext } from "react"
import styles from "./Search.module.css"
import useTasks from "../../hooks/useTask"
import { IoReturnDownBack } from "react-icons/io5";
import { Context } from "../../Context/Context"

// componente de tabela
import Table from "../../components/tableTask/table"

const Search = () => {

    // chamando contexto
    const { authenticate } = useContext(Context)

    // pegando o title do parametro de busca
    const [title] = useSearchParams()
    const query = title.get("q")

    // estados para tarefas e mensagem de erro
    const [tasks, setTasks] = useState<Task[]>([])
    const [msg, setMsg] = useState('')

    // importando função de pesquisa do hook 
    const { getTasksByTitle } = useTasks()

    // useEffect para buscar dados
    useEffect(() => {
        const getData = async () => {

            if (!query) {
                return;
            }
            const data = await getTasksByTitle(query)
            setMsg(data.msg)
            setTasks(data)
        }

        getData()
    }, [])

    return (
        <div>

            {/* VERIFICANDO SE ESTÁ AUTENTICADO OU NÃO */}
            {authenticate ? <>
                <div className={styles.div_searchTitle}>

                    <div className={styles.div_back}>
                        <Link to="/" className={styles.btn_back}><IoReturnDownBack className={styles.icon} />Voltar</Link>
                    </div>

                    <h1>Resultados</h1>

                    <div className={styles.div_table}>
                        {msg ? <h2 className={styles.msg_error}>{msg}</h2> : <Table tasks={tasks} setTasks={setTasks} />}
                    </div>


                </div>
            </> :
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

export default Search