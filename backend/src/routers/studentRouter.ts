import { Router } from "express";
import { StudentController } from "../controllers/studentController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import { StudentMiddleware } from "../middlewares/StudentMiddleware";

const studentController = new StudentController();
const studentRouter = Router();

studentRouter.get(
  "/dashboard",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(StudentMiddleware.checkStudentStatus),
  ErrorHandler.catchErrors(studentController.getAssignments)
);
studentRouter.get(
  "/assignment/:assignmentId",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(StudentMiddleware.checkStudentStatus),
  ErrorHandler.catchErrors(studentController.getAssignmentInfo)
);

export default studentRouter;
