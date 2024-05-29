import { useState, useEffect } from "react";
import { api } from "../config/api";

export default function useUser() {


    // estados para autenticar usuário e para nome do usuário
    const [authenticate, setAuthenticate] = useState(false)
    const [name, setName] = useState('')

    // useEffect para validar token e authenticar o usuário
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            try{
                fetch(api, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                setAuthenticate(true)
            }catch(error){
                console.log("Erro ao verificar token: => " + error)
            }
        }else{
            console.log("Acesso negado!")
        }

        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setName(storedName);
        }
    }, [])




    // função para fazer login no sistema
    async function authLogin(email: string, password: string) {
        try {
            const res = await fetch(`${api}/sign`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if(res.ok){
                localStorage.setItem('token', data.token)
                localStorage.setItem('userName', data.user.name)
            }

            return data
        } catch (error) {
            console.log("Erro interno de servidor para fazer login => " + error)
        }
    }



    // função para registrar usuário
    async function registerUser(name: string, email: string, password: string, confirmPassword: string) {
        try {
            const res = await fetch(`${api}/registerUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            })

            const data = await res.json()
            return data
        } catch (error) {
            console.log("Erro interno de servidor para registrar usuário => " + error)
        }

    }

    return { registerUser, authLogin, authenticate, setAuthenticate, name, setName }
}