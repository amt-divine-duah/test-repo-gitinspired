import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { LecturerController } from "../controllers/lecturerController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import { LecturerMiddleware } from "../middlewares/LecturerMiddleware";

const adminController = new AdminController();
const lecturerController = new LecturerController();
const lecturerRouter = Router();

lecturerRouter.get(
  "/students",
  ErrorHandler.catchErrors(lecturerController.getStudents)
);
lecturerRouter.get(
  "/dashboard/:lecturerId",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.getAssignments)
);
lecturerRouter.get(
  "/drafts/:lecturerId",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.getDrafts)
);
lecturerRouter.get(
  "/submissions/:lecturerId",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.getSubmissions)
);
lecturerRouter.post(
  "/create-assignment",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.createAssignment)
);
lecturerRouter.get(
  "/edit-assignment",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.editAssignment)
);
lecturerRouter.post(
  "/edit-assignment",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.editAssignment)
);
lecturerRouter.get(
  "/invite-students",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.inviteStudents)
);
lecturerRouter.post(
  "/invite-students",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.inviteStudents)
);
lecturerRouter.post(
  "/search-students",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(LecturerMiddleware.checkLecturerStatus),
  ErrorHandler.catchErrors(lecturerController.searchStudents)
);
lecturerRouter.get(
  "/delete-assignment",
  ErrorHandler.catchErrors(lecturerController.deleteAssignment)
);

export default lecturerRouter;
