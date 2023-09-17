import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StoreService } from "./store.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { storeFilterableFields } from "./store.constants";
import { paginationFields } from "../../../constrants/pagination";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { ...storeData } = req.body;

  const result = await StoreService.insertInToDB(storeData);

  sendResponse(res, {
    statusCode: 400,
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
    statusCode: 400,
    success: true,
    message: "stores fetched Successfully",
    data: result,
  });
});

export const StoreController = {
  insertIntoDB,
  getAllFromDB,
};
