import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const authController = new AuthController();

const authRouter = Router();

authRouter.post("/login", ErrorHandler.catchErrors(authController.login));
authRouter.get("/confirm-account/:token", ErrorHandler.catchErrors(authController.confirmAccount));
authRouter.post(
  "/reset-password",
  ErrorHandler.catchErrors(authController.resetPassword)
);

export default authRouter;
