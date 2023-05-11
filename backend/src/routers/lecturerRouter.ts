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
lecturerRouter.post(
  "/edit-assignment",
  ErrorHandler.catchErrors(lecturerController.editAssignment)
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
lecturerRouter.get(
  "/invite-students",
  ErrorHandler.catchErrors(lecturerController.inviteStudents)
);
lecturerRouter.post(
  "/invite-students",
  ErrorHandler.catchErrors(lecturerController.inviteStudents)
);
lecturerRouter.post(
  "/search-students",
  ErrorHandler.catchErrors(lecturerController.searchStudents)
);

export default lecturerRouter;
