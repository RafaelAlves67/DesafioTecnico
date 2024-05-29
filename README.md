# DesafioTecnico

Projeto de teste prático com um to-do-list, tendo backend e frontend com funcionalidades de listagem de tarefas, atualizações de tarefas, criação de tarefas e exclusão de tarefas. Com uma implementação de cadastro e autenticação de usuário (JWT)

# Requisitos
- Node Js
- PostgreSQL

# Configuração do Ambiente de Desenvolvimento

# 1. Clonar o Repositório
git clone https://github.com/RafaelAlves67/DesafioTecnico.git
cd DesafioTecnico

# 2. Instalar Depedências 
Certifique-se de ter o Node.js e o npm instalados. Em seguida, execute:
npm install 

# 3. Configuração do Banco de Dados
## 3.1 Criar Banco de Dados
Conecte-se ao PostgreSQL e crie um banco de dados:
CREATE DATABASE nome_do_banco;

## 3.2 Criar Tabelas
script sql
CREATE TABLE User (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status INTEGER REFERENCES usuarios(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# 4. Configurar Variáveis de Ambiente
O arquivo .env subiu junto com projeto devido se passar de somente um teste prático, e está configurado para uma máquina local
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=db_moisacQ
SECRET=KCJJKCNAWJCBNWJABCAW347235752
DB_HOST=localhost
DB_PORT=5432

edite de acordo com seu ambiente

# 5. Rodas aplicação
## 5.1 para inicar o front-end, execute os seguintes comandos: 
cd frontend
npm run dev
## 5.2 para inicar o front-end, execute os seguintes comandos: 
cd backend
npm run dev









