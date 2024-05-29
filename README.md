# DesafioTecnico

Projeto de teste prático com um to-do-list, tendo backend e frontend com funcionalidades de listagem de tarefas, atualizações de tarefas, criação de tarefas e exclusão de tarefas, e com uma implementação de cadastro e autenticação de usuário (JWT)

# Requisitos
- Node Js
- PostgreSQL

# Configuração do Ambiente de Desenvolvimento

# 1. Clonar o Repositório
git clone https://github.com/RafaelAlves67/DesafioTecnico.git
cd DesafioTecnico

# 2. Instalar Depedências 
Certifique-se de ter o Node.js e o npm instalados. <br> Em seguida, execute:
npm install 

# 3. Configuração do Banco de Dados
## 3.1 Criar Banco de Dados
Conecte-se ao PostgreSQL e crie um banco de dados: <br>
CREATE DATABASE nome_do_banco;

## 3.2 Criar Tabelas
script sql <br>
CREATE TABLE User ( <br>
    id INTEGER PRIMARY KEY, <br>
    name VARCHAR(100) NOT NULL, <br>
    email VARCHAR(100) NOT NULL UNIQUE, <br>
    password VARCHAR(100) NOT NULL <br> 
);
<br>
CREATE TABLE Task ( <br>
    id INTEGER PRIMARY KEY, <br> 
    title VARCHAR(200) NOT NULL, <br>
    description TEXT NOT NULL, <br>
    status INTEGER REFERENCES usuarios(id), <br>
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP <br>
);

# 4. Configurar Variáveis de Ambiente
O arquivo .env subiu junto com projeto devido se passar de somente um teste prático, e está configurado para uma máquina local <br> 
DB_USER=postgres <br> 
DB_PASSWORD=1234 <br> 
DB_NAME=db_moisacQ <br> 
SECRET=KCJJKCNAWJCBNWJABCAW347235752<br>
DB_HOST=localhost <br>
DB_PORT=5432 <br>

edite de acordo com seu ambiente <br>

# 5. Rodas aplicação
## 5.1 para inicar o front-end, execute os seguintes comandos: 
cd frontend <br>
npm run dev <br>
## 5.2 para inicar o front-end, execute os seguintes comandos: 
cd backend <br>
npm run dev <br>









