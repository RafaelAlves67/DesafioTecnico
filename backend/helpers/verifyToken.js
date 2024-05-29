import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv()
// CHAMANDO A PALAVRA SECRETA PARA CRIAÇÃO DO TOKEN(AUTENTICAÇÃO E SEGURANÇA)
const secret = process.env.SECRET

// FUNÇÃO PARA VERIFICAR SE O USUÁRIO ESTÁ AUTENTICANDO OU NÃO
const verifyToken = async (req,res,next) => {

    // PEGANDO O TOKEN NO CORPO DA REQUISIÇÃO (Autenticação)
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]

    // VALIDANDO SE EXISTE UM TOKEN OU NÃO
    if(!token){
        return res.status(401).json({msg: "Acesso negado!"})
    }

    // VALIDANDO SE O TOKEN ESTÁ CORRETO COM O jsonwebtoken
    jwt.verify(token, secret, (error, user) => {
        if(error){
            return res.status(401).json({msg: "Token inválido!"})
        }

        req.user = user
        next();
    }) 
}

export default verifyToken