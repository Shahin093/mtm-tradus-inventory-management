import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StockService } from "./stock.service";
import pick from "../../../shared/pick";
import { stockFilterableFields } from "./stock.constants";
import { paginationFields } from "../../../constrants/pagination";

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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, stockFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StockService.getAllFromDB(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: "Stocks fetched Successfully",
    data: result,
  });
});

export const StockController = {
  insertIntoDB,
  getAllFromDB,
};
