import Express from 'express'
import Cors from 'cors'
import db from './data/db.js'
import Routes from './routes/routes.js'
import Swagger from './routes/Swagger.js'

const app = Express()

app.use(Express.json())
app.use(Cors())
app.use('/', Routes)
app.use('/doc', Swagger)

db.sync()
.then(() => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000!")
        })
    })
    .catch(err => {
        console.error('Erro de banco de dados:', err);
    });