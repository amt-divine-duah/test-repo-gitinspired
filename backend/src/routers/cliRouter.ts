import {Router} from 'express'
import { CliController } from '../controllers/cliController'
import { ErrorHandler} from '../middlewares/ErrorHandler'

const cliController = new CliController();

const cliRouter = Router();

cliRouter.post('/validate-config', ErrorHandler.catchErrors(cliController.validateConfig))

export default cliRouter