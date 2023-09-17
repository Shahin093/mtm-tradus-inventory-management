import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StoreService } from "./store.service";
import sendResponse from "../../../shared/sendResponse";

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

export const StoreController = {
  insertIntoDB,
};
