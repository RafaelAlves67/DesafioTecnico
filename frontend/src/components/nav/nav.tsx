import { Link } from "react-router-dom"
import "./nav.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../../Context/Context"



const nav = () => {

  // chamando o estado de authenticate que está no context para verificar se o usuário está logado ou não
  const { authenticate, logout, name } = useContext(Context)

  // função para navegar para home
  const Navigate = useNavigate()
  const handleHome = () => {
    Navigate('/')
  }

  return (
    <nav>

      <h1 onClick={handleHome}>List <strong>Tasks</strong></h1>

      <ul>

        <li><Link to="/">Home</Link></li>

        {/* VERIFICANDO SE ESTÁ AUTENTICADO OU NÃO */}
        {authenticate ?

          // se estiver autenticado
          <>
            <li>Olá {name}</li>
            <li><button onClick={logout} className="btn-logout">Sair</button></li>
          </>
          :

          // se não estiver autenticado
          <>
            <li><Link to="/login">Entrar</Link></li>
            <li><Link to="/register">Criar conta</Link></li>
          </>}
      </ul>
    </nav>

  )
}

export default nav