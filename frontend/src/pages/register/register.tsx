import { FormEvent, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import styles from './register.module.css'
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const register = () => {

    // estados para criação de usuário
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // estado de mensagem para tenha erros
  const [msg, setMsg] = useState('')

  // navigate - hook do react-router-dom para navegção de rotas
  const Navigate = useNavigate()

  // declarando funções do meu hook para o cadastro de usuario
  const {registerUser} = useUser()

   // função para quando o formulario for enviado
   const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // pegando o que vem do retorno da minha função registerUser
    const data = await registerUser(name,email,password, confirmPassword)
    setMsg(data.msg)

    // validando se o cadastro veio com sucesso
    if(data.statusCode === 200){
       setName('')
       setEmail('')
       setPassword('')
       setConfirmPassword('')
      setTimeout(() => {
          Navigate('/login')
      }, 2000)
    }
}


  return (
     <div className={styles.div_container}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Crie sua conta</h1>

          <div className={styles.inputfield}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>

          <div className={styles.inputfield}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>

          <div className={styles.inputfield}>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className={styles.icon} />
          </div>

          <div className={styles.inputfield}>
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FaLock className={styles.icon} />
          </div>

          <button type="submit">Criar conta</button>

          <div className={styles.div_error}>
              {msg === 'Usuário criado! Você será redirecionado para página de Login' && <p className={styles.sucess}>{msg}</p>}
              {msg !== 'Usuário criado! Você será redirecionado para página de Login' && msg.length > 0 && <p className={styles.error}>{msg}</p>} 
          </div>

        </form>
      </div>
    </div>
  )
}

export default register