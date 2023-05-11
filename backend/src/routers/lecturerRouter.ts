import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { LecturerController } from "../controllers/lecturerController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const adminController = new AdminController();
const lecturerController = new LecturerController();
const lecturerRouter = Router();

lecturerRouter.get(
  "/students",
  ErrorHandler.catchErrors(adminController.getStudents)
);
lecturerRouter.get(
  "/dashboard",
  ErrorHandler.catchErrors(lecturerController.getAssignments)
);
lecturerRouter.get(
  "/drafts",
  ErrorHandler.catchErrors(lecturerController.getDrafts)
);

lecturerRouter.get(
  "/submissions",
  ErrorHandler.catchErrors(lecturerController.getSubmissions)
);
lecturerRouter.post(
  "/create-assignment",
  ErrorHandler.catchErrors(lecturerController.createAssignment)
);
lecturerRouter.get(
  "/edit-assignment",
  ErrorHandler.catchErrors(lecturerController.editAssignment)
);
lecturerRouter.post(
  "/edit-assignment",
  ErrorHandler.catchErrors(lecturerController.editAssignment)
);
lecturerRouter.get(
  "/invite-students",
  ErrorHandler.catchErrors(lecturerController.inviteStudents)
);
lecturerRouter.post(
  "/invite-students",
  ErrorHandler.catchErrors(lecturerController.inviteStudents)
);

export default lecturerRouter;
