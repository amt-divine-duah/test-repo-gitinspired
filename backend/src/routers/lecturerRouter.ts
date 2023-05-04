import { Router } from "express";
import { LecturerController } from "../controllers/lecturerController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const lecturerController = new LecturerController()
const lecturerRouter = Router()


lecturerRouter.get("/get-students", ErrorHandler.catchErrors(lecturerController.getStudents))



export default lecturerRouter