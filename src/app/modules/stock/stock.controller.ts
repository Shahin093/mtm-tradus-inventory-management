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

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StockService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "stock fetched Successfully",
    data: result,
  });
});

const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StockService.updateFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "stock update Successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StockService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "stock deleted Successfully",
    data: result,
  });
});

export const StockController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
};
