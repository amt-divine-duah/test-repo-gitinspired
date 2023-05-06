import { PrismaClient } from "@prisma/client";
import { PaginationInfo } from "../interfaces/PaginationInfo";

export class Paginator {
  static async paginate(modelName: string, req: any, prisma: PrismaClient) {
    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.pageSize) || 8;
    const offset = (page - 1) * pageSize;

    // get the Items
    // get the Items
    const records = await prisma[modelName].findMany({
      skip: offset,
      take: pageSize,
      orderBy: { id: "desc" },
    });

    const totalItems = await prisma[modelName].count();

    const pages = Math.ceil(totalItems / pageSize);
    const currentPage = offset / pageSize + 1;
    const hasNext = currentPage < pages;
    const hasPrevious = currentPage > 1;

    const paginationInfo: PaginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalItems,
      pages,
      hasNext,
      hasPrevious,
    };

    return { records, paginationInfo };
  }
}
