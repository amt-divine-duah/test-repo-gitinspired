import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { myStream } from "./configs/winstonConfig";
import authRouter from "./routers/authRouter";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { ResponseUtil } from "./utils/Response";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import adminRouter from "./routers/adminRouter";
import lecturerRouter from "./routers/lecturerRouter";

export default function configureApp() {
  const app: Application = express();

  // middlewares
  app.use(cors());
  app.use(morgan("combined", { stream: myStream }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // end middlewares

  // routers
  app.get("/hello", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      success: true,
      message: "Welcome to this place",
    });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/lecturer", lecturerRouter);

  // end routers

  app.use("*", (req: Request, res: Response) => {
    return ResponseUtil.sendError(
      res,
      "Item/page you are looking for does not exist",
      StatusCodes.NOT_FOUND,
      ReasonPhrases.NOT_FOUND
    );
  });

  // Define a middleware function to handle errors
  app.use(ErrorHandler.handleErrors);

  return app;
}
