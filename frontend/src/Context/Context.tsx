import { createContext, ReactNode } from "react";
import useUser from "../hooks/useUser";

// Valor inicial do nosso contexto
const initialValue = {
    authenticate: false,
    logout: () => {},
    login: () => {},
    name: '',
    setName: () => {}
}

// Tipando o nosso contexto por causa do typescript
type authContext = {
    authenticate: boolean,
    logout: () => void,
    login: () => void,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
}

// criando nosso contexto
export const Context = createContext<authContext>(initialValue)

// criando o context Provider para definir por onde o contexto vai percorrer (vai percorrer por todo o sistema)
export const ContextProvider = ({children}: {children: ReactNode}) => {

    const {authenticate, setAuthenticate, name, setName} = useUser()

    function logout(){
        setAuthenticate(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
    }

    function login(){
        setAuthenticate(true)
    }

    return (
        <Context.Provider value={{authenticate, logout, login, name, setName}}>
            {children}
        </Context.Provider>
    )
}
