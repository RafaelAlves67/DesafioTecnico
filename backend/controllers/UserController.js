// IMPORTANDO DEPENDENCIAS PARA CADASTRO E LOGIN DE USUÁRIO
import bcrypt from 'bcrypt'
import { configDotenv } from 'dotenv'
configDotenv()
import jwt from 'jsonwebtoken'

// IMPORTANDO O MODEL DE USUARIO
import User from '../models/User.js'

// CHAMANDO A PALAVRA SECRETA PARA CRIAÇÃO DO TOKEN(AUTENTICAÇÃO E SEGURANÇA)
const secret = process.env.SECRET

export class UserController {
     // função para criação de usuário
     static async registerUser(req,res){

        const {name,email,password,confirmPassword} = req.body 

        // VALIDAÇÕES DE CAMPOS VAZIOS
        if(!name){
            return res.status(400).json({msg: "Preencha o campo de nome para fazer o cadastro!"})
        }

        if(!email){
            return res.status(400).json({msg: "Preencha o campo de email para fazer o cadastro!"})
        }

        if(!password){
            return res.status(400).json({msg: "Preencha o campo de senha para fazer o cadastro!"})
        }

        if(!confirmPassword){
            return res.status(400).json({msg: "Preencha o campo de confirmação de senha para fazer o cadastro!"})
        }

        if(password !== confirmPassword){
            return res.status(422).json({msg: "A senha e a confirmação de senha não correspondem!"})
        }

        // VALIDAÇÃO DE EMAIL EXISTENTE
        const userExist = await User.findOne({where: {email: email}})

        if(userExist){
            return res.status(409).json({msg: "Email já cadastrado!"})
        }

        // INICIANDO OS PROCEDIMENTOS PARA CRIAÇÃO DO USUÁRIO
        
        // criptografando a senha com o bcrypt
        const salt = 12 
        const hashPassword = await bcrypt.hash(password, salt)

        // TRY e CATCH para tratamento de erros
        try{

            // SALVANDO USUARIO NO BANCO DE DADOS
            const newUser = await User.create({
                name: name, 
                email: email, 
                password: hashPassword, 
            })
     
            //RETORNANDO MENSAGEM DE SUCESSO.
            return res.status(200).json({msg: "Usuário criado! Você será redirecionado para página de Login", statusCode: 200})

        }catch(error){
            console.log("Erro de servidor ao criar usuario => " + error)
            return res.status(500).json("Erro de servidor interno => " + error)
        }
    }

      // função para login de usuário
      static async loginUser(req,res){
        const {email, password} = req.body
        
        // VALIDAÇÃO DE CAMPO VAZIO
        if(!email){
            return res.status(400).json({msg: "Preencha o campo de email para fazer o login!"})
        }

                
        if(!password){
            return res.status(400).json({msg: "Preencha o campo de senha para fazer o login!"})
        }

        // VALIDANDO SE O EMAIL EXISTE NO BANCO DE DADOS
        const user = await User.findOne({where: {email: email}})

        if(!user){
            return res.status(404).json({msg: "Usuário não encontrado!"})
        }


        // VALIDANDO SE A SENHA ESTÁ CORRETA COM O bcrypt
        const checkPassword = await bcrypt.compare(password, user.password)

        if(checkPassword){
            // CRIANDO TOKEN PARA AUTENTIÇÃO DE USUÁRIO COM O JsonWebToken
            const token = jwt.sign({id: user.id}, secret)

            return res.status(200).json({
                msg: "Bem-vindo ao nosso sistema!", 
                token, 
                user,
                statusCode: 200
            })
        }else{
            return res.status(401).json({msg: "Senha incorreta!"})
        }
    }
}