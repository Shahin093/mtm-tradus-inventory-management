import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StoreService } from "./store.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { storeFilterableFields } from "./store.constants";
import { paginationFields } from "../../../constrants/pagination";
import httpStatus from "http-status";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...storeData } = req.body;

  const result = await StoreService.insertInToDB(storeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "store created Successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, storeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StoreService.getAllFromDB(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "stores fetched Successfully",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StoreService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Store fetched Successfully",
    data: result,
  });
});

export const StoreController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
