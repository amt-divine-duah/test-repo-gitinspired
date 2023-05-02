import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import { FileUploader } from "../middlewares/FileUploader";


const adminController = new AdminController()
const adminRouter = Router()


adminRouter.post("/create-student", ErrorHandler.catchErrors(adminController.createStudent))
adminRouter.post("/upload-student-info",FileUploader.upload("files", "students", 2 * 1024 * 1024), ErrorHandler.catchErrors(adminController.uploadStdInfo))


export default adminRouter