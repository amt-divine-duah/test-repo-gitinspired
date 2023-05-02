import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const authController = new AuthController()

const authRouter = Router()

authRouter.post("/login", ErrorHandler.catchErrors(authController.login))


export default authRouter