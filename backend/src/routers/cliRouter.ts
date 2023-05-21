import { Router } from 'express';
import { CliController } from '../controllers/cliController';
import { ErrorHandler } from '../middlewares/ErrorHandler';

const cliController = new CliController();

const cliRouter = Router();

cliRouter.post('/submit-snap', ErrorHandler.catchErrors(cliController.submit));
cliRouter.post('/send-mail', ErrorHandler.catchErrors(cliController.sendMail));

export default cliRouter;
