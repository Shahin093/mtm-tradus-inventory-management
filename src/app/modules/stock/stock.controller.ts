import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StockService } from "./stock.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...stockData } = req.body;

  const result = await StockService.insertIntoDB(stockData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock created Successfully.",
    data: result,
  });
});

export const StockController = {
  insertIntoDB,
};
