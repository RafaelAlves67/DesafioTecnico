import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv()

// importando usuário e senha do banco
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME 
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT 


// conectando o banco
const db = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    host: `${DB_HOST}`,
    dialect: 'postgres',
    port: `${DB_PORT}`
})

db.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso ao banco postgreesql.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

export default db;