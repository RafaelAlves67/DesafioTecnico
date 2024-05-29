import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert {type: "json"}

const Router = express.Router()

Router.use('/', swaggerUi.serve);
Router.get('/', swaggerUi.setup(swaggerDocument));

export default Router

