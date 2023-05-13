import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import { FileUploader } from "../middlewares/FileUploader";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";

const adminController = new AdminController();
const adminRouter = Router();

adminRouter.post(
  "/create-student",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.checkAdminStatus),
  ErrorHandler.catchErrors(adminController.createStudent)
);
adminRouter.post(
  "/create-lecturer",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.checkAdminStatus),
  ErrorHandler.catchErrors(adminController.createLecturer)
);
adminRouter.post(
  "/upload-student-info",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.checkAdminStatus),
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  FileUploader.upload("files", "students", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(adminController.uploadStdInfo)
);
adminRouter.post(
  "/upload-lecturer-info",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.checkAdminStatus),
  FileUploader.upload("files", "lecturers", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(adminController.uploadLecInfo)
);
adminRouter.get(
  "/lecturers",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.checkAdminStatus),
  ErrorHandler.catchErrors(adminController.getLecturers)
);
adminRouter.get(
  "/students",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.checkAdminStatus),
  ErrorHandler.catchErrors(adminController.getStudents)
);

export default adminRouter;
