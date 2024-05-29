import express from 'express'
import { TaskController } from '../controllers/TaskController.js'
const Routes = express.Router()
import verifyToken from '../helpers/verifyToken.js'
import {UserController} from '../controllers/UserController.js'

// rotas publicas
Routes.post('/registerUser', UserController.registerUser)
Routes.post('/sign', UserController.loginUser)

// Rotas protegidas
Routes.get('/getTasks', verifyToken, TaskController.getTasks)
Routes.post('/registerTask', verifyToken, TaskController.addTasks)
Routes.put('/editTask/:id', verifyToken, TaskController.editTask)
Routes.delete('/deleteTask/:id', verifyToken, TaskController.deleteTask)
Routes.get('/search/:title', verifyToken, TaskController.searchTask)

export default Routes