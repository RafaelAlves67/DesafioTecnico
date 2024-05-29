import { FormEvent, useState, useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { Context } from "../../Context/Context";


const Login = () => {

    // Estados para armazenar as entradas do usuário
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado de mensagem de erro e sucesso
    const [msg, setMsg] = useState('')

    // Navigate - hook do react router dom para navegação de rotas
    const Navigate = useNavigate()

    // chamando os metodos do contexto
    const {login, setName} = useContext(Context)

    // chamando a função de login do hook useUser
    const {authLogin} = useUser()

    // Função que é chamada quando o formulário é enviado
    const handleSubmit = async (e: FormEvent) => {
    // Impede que a página seja recarregada
    e.preventDefault();

    const data = await authLogin(email,password)
    setMsg(data.msg)

    // se o login for realizado com sucesso
    if(data.statusCode === 200){
      setEmail('')
      setPassword('')
      setName(data.user.name)
      login()
      setTimeout(() => {
          Navigate('/')
      }, 1500)
    }

  };

    return (
        <div className={styles.div_container}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <h1>Acesse o sistema</h1>
                    <div className={styles.input_field}>
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaUser className={styles.icon} />
                    </div>
                    <div className={styles.input_field}>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className={styles.icon} />
                    </div>

                    <div className={styles.recall_forget}>
                        <label>
                            <input type="checkbox" />
                            Lembre de mim
                        </label>
                        <a href="#">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className={styles.signup_link}>
                        <p>
                            Não tem uma conta? <Link to="/register">Crie sua conta</Link>{" "}
                        </p>
                    </div>

                    <div className={styles.div_error}>
                        {msg === 'Bem-vindo ao nosso sistema!' && <p className={styles.sucess}>{msg}</p>}
                        {msg !== 'Bem-vindo ao nosso sistema!' && msg.length > 0 && <p className={styles.error}>{msg}</p>}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login