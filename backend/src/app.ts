import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import morgan from "morgan";
import { myStream } from "./configs/winstonConfig";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import adminRouter from "./routers/adminRouter";
import authRouter from "./routers/authRouter";
import cliRouter from "./routers/cliRouter";
import lecturerRouter from "./routers/lecturerRouter";
import studentRouter from "./routers/studentRouter";
import { ResponseUtil } from "./utils/Response";
import swaggerUI from "swagger-ui-express"
import * as swaggerDocument from "./swagger.json";

export default function configureApp() {
  const app: Application = express();

  // middlewares
  app.use(cors());
  app.use(morgan("combined", { stream: myStream }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // end middlewares

  // routers
  app.get(
    "/api/health-check",
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const healthcheck = {
          uptime: process.uptime(),
          message: "OK",
          timestamp: Date.now(),
        };
        return ResponseUtil.sendResponse(res, "Server is up", healthcheck);
      } catch (error) {
        return ResponseUtil.sendError(
          res,
          `${error}`,
          StatusCodes.SERVICE_UNAVAILABLE,
          ReasonPhrases.SERVICE_UNAVAILABLE
        );
      }
    }
  );

  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/lecturer", lecturerRouter);
  app.use("/api/student", studentRouter);
  app.use("/api/cli", cliRouter);

  // swwagger docs
  const options = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Git Inspired Assignment Submission System",
  };
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));

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
