import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { LecturerController } from "../controllers/lecturerController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const lecturerController = new LecturerController();
const lecturerRouter = Router();
const adminController = new AdminController();

lecturerRouter.get(
  "/students/:page",
  ErrorHandler.catchErrors(adminController.getStudents)
);
lecturerRouter.post(
  "/create-assignment",
  ErrorHandler.catchErrors(lecturerController.createAssignment)
);
lecturerRouter.get(
  "/edit-assignment",
  ErrorHandler.catchErrors(lecturerController.editAssignment)
);
lecturerRouter.get(
  "/submissions/",
  ErrorHandler.catchErrors(lecturerController.getSubmissions)
);

export default lecturerRouter;
