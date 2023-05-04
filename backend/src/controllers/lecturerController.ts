import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../utils/Response";
import { Paginator } from "../utils/Paginator";
import { prisma } from "../configs/prismaConfig";
import { StatusCodes } from "http-status-codes";


export class LecturerController {

    async getStudents(req: Request, res: Response, next: NextFunction) {
        


        console.log("Hey there")
        const { records: users, paginationInfo } = await Paginator.paginate(
          "user",
          req,
          prisma
        );

        console.log("All data", users)

        return ResponseUtil.sendResponse(res, "Students fetched successfully", users, StatusCodes.OK, paginationInfo)
    }
}